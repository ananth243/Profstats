const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const facSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    courseId:{
        type: String,
        required: true,
    },
    facid:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const Faculty= mongoose.model('faculty', facSchema);
module.exports = Faculty;