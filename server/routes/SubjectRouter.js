const router = require('express').Router();
const Subject = require("../models/subjectSchema");
const { validAdmin } = require('../utils/middleware');


router.post('/add',validAdmin,async(req,res)=>{
    const { code, title, date, time } = req.body;

    const subjectdetails = new Subject(
        {
            code : code,
            title : title,
            date : date,
            time : time,
        }
    )
    await subjectdetails.save()
    .then(() => {
        res.status(201).json(
            `Subject Saved Successfully`
        );
    })
    .catch((error) => {
        if (error.code === 11000){
            return res.status(409)
            .json("Subject Code Already Exists");
        }
        res.status(500)
        .json(error);
    });

});

router.get('/subjectcode',validAdmin,async(req,res)=>{
    const subjectdata = await Subject.find().select({code:true,title:true})
    res.status(200).json(subjectdata);
    
});

router.get('/subjects',async(req,res)=>{
    const subjectdata = await Subject.find()
    res.status(200).json(subjectdata);
    
})

router.delete("/:id",validAdmin,async(req,res)=>{
    try{
        await Subject.deleteOne({_id:req.params.id});
        return res.status(202).json("Subject Deleted");
    }
    catch(err){
        res.send(err);
    }

})

module.exports = router;