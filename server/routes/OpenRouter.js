const router = require('express').Router();
const StudentModel = require("../models/studentSchema");
const SubjectModel = require("../models/subjectSchema")


router.post("/login",async(req,res)=>{

    const {regno, dob} = req.body;
    const StudExists = await StudentModel.findOne({regno:regno})
    if(!StudExists)
        return res.status(404).json("Register no Doesn't Exists");
    if(StudExists.dob != dob)
        return res.status(404).json("Invalid Details");
    return res.status(200).json(StudExists);

})


router.get('/subjects',async(req,res)=>{
    const subjectdata = await SubjectModel.find()
    res.status(200).json(subjectdata);
    
})

router.get("/route/:id",async(req,res)=>{
    try{
        const data = await StudentModel.findById(req.params.id);
        if(!data)
            return res.status(404).json("Data Not Found");
        return res.send(data);
    }catch(err){
        return res.status(404).json("Data Not Found");
    }
    
    
})



module.exports = router;