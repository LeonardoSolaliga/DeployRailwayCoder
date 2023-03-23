import { Router } from "express";

function isLoggedIn(req, res, next){
    req.session.user ? next() : res.redirect("/login")
}

const router = Router();
router.get("/",isLoggedIn,async(req, res)=>{
    req.session.cookie.expires = new Date(Date.now() + 30000)
    res.render("inicio",{user:req.session.user});
});
router.get('/register',(req,res)=>{
    res.render('register',{});
})

router.get('/login',(req,res)=>{
    req.logger.warning('warning')
    res.render('login',{});
})
router.get('/logout',(req,res)=>{
    try{
    req.session.destroy();
    res.redirect('/')
    }catch(err){
        res.send(err);
    }
})
router.get('/info',(req,res)=>{
    res.json({
        name: process.title,
        nodeVersion:process.version,
        pid:process.pid,
        uptime:process.uptime(),
        memoryUsage:process.memoryUsage(),
        plataform:process.plataform,
        arch:process.arch
    })
})

export default router;