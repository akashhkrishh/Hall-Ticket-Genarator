const router = require('express').Router();
const StudentModel = require("../models/studentSchema");
const multer = require("multer");
const upload = multer();


router.post("/add",upload.single('image'),async(req,res)=>{
   

    try{
        const ImageData = {
            file_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_data: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            file_size: req.file.size,
        }
        const { name, dob, regno, subjects, semester, college, course, centrecode} = req.body; 
        const myArray = subjects.split(',');
     
        const Student = new StudentModel({
            image: ImageData,
            name: name,
            regno: regno,
            dob: dob,
            subjects: myArray,
            semester: semester,
            college: college,
            course: course,
            centrecode: centrecode,
        });

        await Student.save();
        return res.status(201).json(
           'Student Added successfully'
        );
    }
    catch(err){
        if (err.code === 11000) {
            return res.status(409)
            .json("Registerno Already Exists");
        }
        return res.status(500).json(err);
    }

});


router.get('/students',async(req,res)=>{
    const studentsdata = await StudentModel.find()
    res.status(200).json(studentsdata);
    
})

router.delete("/:id",async(req,res)=>{
    try{
        await StudentModel.deleteOne({_id:req.params.id});
        return res.status(202).json("Student Deleted");
    }
    catch(err){
        res.send(err);
    }

})



module.exports = router;