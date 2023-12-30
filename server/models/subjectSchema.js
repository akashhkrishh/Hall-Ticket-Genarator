const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
 
    code : {
        type : String,
        unique : true,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    time : {
        type : String,
        required : true,
    }
    
});

module.exports = subjectModel = mongoose.model('subjectDB', subjectSchema );