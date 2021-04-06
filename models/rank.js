const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const rankSchema= new Schema({
    /*I have created an id for each induvidual professor 
    which will take only numbers as inputs
    id1:Ravindra Singh Saluja
    id2:Iniyan Thiruselvam N
     id3:Vaibhav Joshi
     id4:Biswajit Das
     id5:Manoj Kumar Hilalpure 
     id6:Gavade Atul Arjun
     Only for BITS F110
     We can make another db storing all the fac ids,course id */
    id1:{
        type:Number,
        required:false,
    },
    id2:{
        type:Number,
        required:false,
    },
    id3:{
        type:Number,
        required:false,
    },
    id4:{
        type:Number,
        required:false,
    },
    id5:{
        type:Number,
        required:false,
    },
    id6:{
        type:Number,
        required:false,
    },
    courseId:{
        type: String,
        required: false,
    },
    comments:{
        type:String,
        required: false,
    },
    user:{
        type:String,
        required: false,
    },
    year:{
        type:String,
        required: false,
    },
    /*name:{
        type:String,
        required:true,
    },
    average:{
        type: Number,
        required: true,
    }*/
}, {timestamps: true});

const Rank= mongoose.model('rank', rankSchema);
module.exports= Rank;