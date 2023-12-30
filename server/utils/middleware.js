const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken')


const validAdmin = async (req,res,next) =>{
    var token = req.header('Authorization');
    req.token = token;
    await jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        console.log(data)
        var Admins = await Admin.findOne({email:data.email})
        req.user = Admins;
        next();
    })
}

module.exports  = {
    validAdmin,
}