import passport from "passport"
import local from 'passport-local';
import userModel from "../Model/user.js"
import { validatePassword } from "../utils.js"
import GithubStrategy from 'passport-github2'
import config from './config.js'


const LocalStrategy=local.Strategy;
const initializeStrategies=()=>{
    passport.use('login', new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        if(!email||!password) return done(null,false,{message:"Valores incompletos"})
        const user = await userModel.findOne({email});
        if(!user) return done(null,false,{message:"credeciales invalidas"});
        const isValidatePassword=await validatePassword(password,user.password)
        if(!isValidatePassword) return done(null,false,{message:"contraseña invalido"})
        return done(null,user)
    }))

    passport.use('github', new GithubStrategy({
        clientID:"Iv1.f4454fea59d547c6",
        clientSecret:config.github.githubSecret,
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"

    },async(accessToken,refreshToken,profile,done)=>{
        try{
            const {name,email}=profile._json;
            const user=await userModel.findOne({email})
            if(!user){
                const newUser={
                    first_name:name,
                    email,
                    password:''
                }
                const result = await userModel.create(newUser)
                return done(null,result);
            }
            done(null,user);
        }catch(error){
            done(error);
        }

        


    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        const result=await userModel.findOne({_id:id})
        done(null,result);
    })
}



export default initializeStrategies;