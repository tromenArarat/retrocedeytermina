import passport from 'passport';
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import Users from '../dao/dbGestor/users.js';
import {createHash,isValidPassword} from '../utils.js';
import config from './config.js';

const JWTStrategy = jwt.Strategy;
const LocalStrategy = local.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const userService = new Users();

const CLAVE = config.CLAVE;

const initializePassport = () =>{
    passport.use('register',new LocalStrategy({
        passReqToCallback:true,usernameField:'email'},async(req,username,password,done)=>{
            const {first_name,last_name,email,age}=req.body;
        try{
            let user = await userService.findEmail(username);
            if(user){
                console.log("El usuario ya existe");
                return done(null,false)
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password:createHash(password)
            }
            req.user = newUser;
            let result = await userService.createOne(newUser);
            return done(null,result);
        }catch(err){
            return done('Error al obtener el usuario'+err);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
        try{
            const user = await userService.findEmail(username);
            if(!user){
                console.log('usuario no existe')
                return done (null,false);
            }
            if(!isValidPassword(user,password)) return done (null,false);
            return done(null,user)
        }catch(error){
            return done(error)
        }
    }));

  

    passport.use('jwt',new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: CLAVE,
    },async(jwt_payload,done)=>{
        try{
            return done(null,jwt_payload);
        }catch(err){
            return done(err);
        }
    }));

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async (id,done)=>{
        let user= await userService.getOne(id);
        done(null,user);
    });

}

const cookieExtractor = req =>{
    let token = null;
    if(req&&req.cookies){
        token=req.cookies[config.COOKIE]
    }
    return token
}

export default initializePassport;



/*
const initializePassport = () =>{
    passport.use("github", new GitHubStrategy({
        clientID: config.ID,
        clientSecret: config.CLIENT,
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done)=>{
        try{
            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("Profile:", profile);
            let user = await userService.findEmail(profile._json.email);
            console.log(user)
            if(!user){
                let newUser = {
                    first_name:profile._json.name,
                    last_name:"",
                    age:38,
                    email:profile._json.email,
                    password:""
                }
                let result = await userService.createOne(newUser);
                done(null, result);
            }
            else{
                done(null, user);
            }
        }catch(error){
            return done(error);
        }
    }))
    

*/