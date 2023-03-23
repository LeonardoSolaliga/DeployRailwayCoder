import express from 'express';
import session from 'express-session';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';
import Contenedor from "./api/Contenedor.js";
import Mensajes from "./api/mensajes.js"
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import viewsRouter from './Routers/views.router.js';
import sessionsRouter from './Routers/sessions.router.js';
import forkRouter from './Routers/fork.router.js'
import passport from 'passport';
import initializeStrategies from './config/passport.config.js';
import config from './config/config.js'
import { addLogger } from './middlewares/logger.js';

const productos=new Contenedor("./public/productos.txt");
const msg=new Mensajes("./public/chat.txt")
const app = express()
const PORT = config.app.PORT;
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

mongoose.set('strictQuery', true);
try{
    mongoose.connect(config.mongo.mongoUrl,error=>{
        if(error) console.log(error)
        else console.log("base conectada")
})
}catch(error){
    console.log(error);
}
app.use(session({
    store: MongoStore.create({
        mongoUrl:config.mongo.mongoUrl,
        ttl:60
    }),
    secret: config.mongo.mongoSecret,
    resave: false,
    saveUninitialized: false
}));
//view engine
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/public/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Logger
app.use(addLogger);


httpServer.listen(PORT,()=>console.log("server abierto"))




//websocket
io.on("connection",async(socket)=>{
    socket.emit('UpdateProduct', await productos.getAll());
    socket.emit('UpdateMensaje', await msg.getAll());
    socket.on('newproduct', async product => {
        await productos.save(product)
        io.emit('UpdateProduct', await productos.getAll())
    })
    socket.on('newMensaje', async mensaje => {
        await msg.save(mensaje);
        io.emit('UpdateMensaje', await msg.getAll());
    })
})

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/random',forkRouter);


app.get('/pruebaLogger', (req, res) => {
    res.send("ok");
})