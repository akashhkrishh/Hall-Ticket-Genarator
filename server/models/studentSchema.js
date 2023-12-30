const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

    image: { 
        file_name: String,
        file_type: String,
        file_data: String,
        file_size: String,
    },
    name: { type: String, required: true, },
    dob: { type: String, required: true, },
    regno: { type: String, required: true, unique: true },
    subjects: { type: [String], required: true, },
    semester: {type: String, required: true, },
    college: { type: String, required: true, },
    course: { type: String, required: true, },
    centrecode: { type: String, required: true, }

});


module.exports = mongoose.model('studentDB',studentSchema);