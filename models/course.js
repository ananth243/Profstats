const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const courseSchema= new Schema({
    course:{
        type: String,
        required: true,
    },
    courseId:{
        type: String,
        required: true,
    }
}, {timestamps:true});

const Course= mongoose.model('course', courseSchema);
module.exports= Course;