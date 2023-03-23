import { Router } from "express";
import {fork} from 'child_process';
import __dirname from '../utils.js';

let contador=0;
const router = Router();
router.get("/",async(req, res)=>{
    console.log(`${__dirname}`)
    res.send(`You visited this page ${++contador} times`);
});
router.get('/random',(req,res)=>{
    let numberGenerate = req.query.num ? req.query.num : 100000000;
    const childProcess = fork(`${__dirname}/utils.js`);
    childProcess.send(numberGenerate);
    childProcess.on('message', value => {
        res.json(value);
    });
})

export default router;