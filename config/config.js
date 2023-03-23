import dotenv from 'dotenv'

dotenv.config();
export default {
    app:{
        PORT: process.env.PORT||8080
    },
    mongo:{
        mongoUrl: process.env.mongoUrl,
        mongoSecret: process.env.mongoSecret
    },
    github:{
        githubSecret:process.env.githubSecret
    }
    
}