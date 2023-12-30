const router =  require('express').Router();
const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post("/login",async(req,res)=>{

    const { email, pass } = req.body;
       
    try{

        const emailExists = await Admin.findOne({
            email:email
        });
    
        if(!emailExists){
            return res.status(400).json("Email doesn't Exists");
        }

        const valid =  await bcrypt.compare(pass, emailExists.pass);

        if(!valid){
            return res.status(400).json("Password was incorrect. ");
        }

        const userToken = jwt.sign({ email: email,role:"ADMIN" }, process.env.PRIVATE_KEY);
        return res.header('auth',userToken).send(userToken); 
         
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error: err
        });
    }
});



router.post('/register',async(req,res)=>{

    try{
        
        
        const { name, email, pass, } = req.body;
        const hash_pass = await bcrypt.hash(pass,10);
        
        const admin= new Admin({
        
            name: name,
            email: email,
            pass: hash_pass,

        });

        const result = await admin.save();
        return res.status(201).send({
            message: 'Admin Added successfully',
        });
    }
    catch(error){
        if (error.code === 11000) {
            return res.status(409).json({ 
                error: "This Email already Exists"
            });
        }
        console.log(error);
    } 

});



module.exports = router;