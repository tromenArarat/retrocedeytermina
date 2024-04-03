import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport';
import multer from 'multer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_OR_KEY = process.env.SECRET_OR_KEY;

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// export const passportCall = (strategy) => {
//   return async (req, res, next) => {
//       passport.authenticate(strategy, function (err, user, info) {
         
//         if (err) return next(err);
//           if (!user) return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
//           req.user = user;
//           console.log(user)
//           next();
//       })(req, res, next);

//   }

// }
export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function(err, user, info) {
      if (err) return next({errorre:err,info:info});
      if (!user) {
        if (options.failureRedirect) {
          return res.redirect(options.failureRedirect); // Redirect to the failure route
        } else {
          return res.status(401).send({ error: info.message || "Unauthorized" });
        }
      }
      req.user = user;
      next();
    })(req, res, next);
  };
}; 

// export const authorization = (...role) => {
//   return (req, res, next) => {
//     console.log(req.user.user.role)
//       role.includes(req.user.user.role) ? next() : res.status(403).send({ error: "No permitido" })
//   }
// }
export const authorization=(role)=>{
    return async(req,res,next)=>{
        if(!req.user)return res.status(401).send({error:"No autorizado"})
        if(req.user.user.role!=role) return res.status(403).send({error:"No permitido"})
        next();
    }
}

export const generateToken = (user) => {
    const token = jwt.sign({ user }, SECRET_OR_KEY, { expiresIn: "24h" });
    return token;
  };
  
  export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).send({
        error: "Not authenticated",
      });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_OR_KEY, (error, credentials) => {
      if (error) return res.status(403).send({ error: "Not authorized" });
      req.user = credentials.user;
      next();
    });
  };

 
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, __dirname + '/public')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
})