import passport from 'passport';
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import Users from '../services/user.service.js';
import Product from '../services/product.service.js';
import { createHash, isValidPassword, generateToken, authToken } from '../utils.js';

import dotenv from 'dotenv';

dotenv.config();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const userService = new Users();
const productService = new Product();

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            let user = await userService.findEmail(username);
            if (user) {
                console.log("El usuario ya existe");
                return done(null, false)
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            req.user = newUser;
            let result = await userService.saveUser(newUser);
            const access_token = generateToken(newUser);
            return done(null, result);
        } catch (err) {
            return done('Error al obtener el usuario' + err);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.findEmail(username);
            if (!user) {
                console.log('El usuario no existe')
                return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }));


    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([
            ExtractJWT.fromUrlQueryParameter('token'),
            ExtractJWT.fromAuthHeaderAsBearerToken(),
            (req) => {
                let token = null;
                if (req && req.cookies && req.cookies[process.env.COOKIE_TOKEN]) {
                    token = req.cookies[process.env.COOKIE_TOKEN];
                }
                
                console.log(token)
                return token;
            }
        ]),
        secretOrKey: process.env.SECRET_OR_KEY,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (err) {
            return done(err);
        }
    }));

    passport.use("github", new GitHubStrategy({
        clientID: process.env.ID,
        clientSecret: process.env.CLIENT,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // console.log("Access Token:", accessToken);
            // console.log("Refresh Token:", refreshToken);
            // console.log("Profile:", profile);
            let user = await userService.findEmail(profile._json.email);
            if (!user) {
                let newUser = {
                    first_name: profile._json.name.split(' ')[0],
                    last_name: profile._json.name.split(' ')[1],
                    age: 38,
                    email: profile._json.email,
                    password: createHash("123")
                }
                let result = await userService.saveUser(newUser);
                const access_token = generateToken(newUser);
                done(null, result);
            }
            else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getUserById(id);
        done(null, user);
    });

}

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[process.env.COOKIE_TOKEN]
    }
    return token
}

export default initializePassport;