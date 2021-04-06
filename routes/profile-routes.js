const router= require('express').Router();
const Course= require('../models/course');
const Faculty= require('../models/faculty');
const Rank= require('../models/rank');

var description, faculty, id, dict2, arr=[], dict={}, dic = [];

const authCheck= (req, res, next)=>{
    if(!req.user){
        //if user is not logged in
        res.redirect('auth/login');
    }
    else{
        //if logged in
        next();
    }
};

router.get('/',(req,res)=>{
    Course.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index', {user: req.user, title: "Welcome", course: result});
    })
    .catch((err)=>console.log(err));
})


router.get('/BITS%20F110', (req, res)=>{
    var N,x=[0,0,0,0,0,0],faculty=[], arr=[];
        Rank.find({ courseId: "BITS F110" })//This is to find the total entries
            .then((result) => {
                N = (result.length) - 1;
                //console.log(N);
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    x[0]+=element["id1"];
                    x[1]+=element["id2"];
                    x[2]+=element["id3"];
                    x[3]+=element["id4"];
                    x[4]+=element["id5"];
                    x[5]+=element["id6"];
                }
            })
            .catch((err) => console.log(err));
        Faculty.find({courseId: "BITS F110"})
            .then((result)=>{
                faculty = result;
                //console.log("HELLO!!");
                for (let index = 0; index < faculty.length; index++) {
                    var element = faculty[index];
                    dict = {};
                    dict["name"] = element.name;
                    dict["facid"] = element.facid;
                    if(N==0){
                        dict["id"]=0;
                    }
                    else{
                        dict["id"] = x[index] / N
                    }
                    arr.push(dict);
                }
                faculty = arr;
                //console.log(faculty);
                description = "Engineering Graphics could be the primary medium for conceptualizing and communicating design concepts during development of engineering goods. The objective of the course is to train the students in this important skill needed for all engineering disciplines and familiarize them with established engineering drawing practice through videolecturing as well as hands on training";
                res.render('course', {
                    faculty: faculty,
                    rank: result,
                    user: req.user,
                    url: "BITS%20F110",
                    title: "BITS F110",
                    description: description,
                })
            .catch((err) => console.log(err));
        })
    });




router.get('/BITS%20F111', (req, res)=>{
    var N,x=[0,0,0,0,0,0],faculty=[], arr=[];
        Rank.find({ courseId: "BITS F111" })//This is to find the total entries
            .then((result) => {
                N = (result.length) - 1;
                //console.log(N);
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    x[0]+=element["id1"];
                    x[1]+=element["id2"];
                    x[2]+=element["id3"];
                    x[3]+=element["id4"];
                    x[4]+=element["id5"];
                    x[5]+=element["id6"];
                }
            })
            .catch((err) => console.log(err));
        Faculty.find({courseId: "BITS F111"})
            .then((result)=>{
                faculty = result;
                //console.log("HELLO!!");
                for (let index = 0; index < faculty.length; index++) {
                    var element = faculty[index];
                    dict = {};
                    dict["name"] = element.name;
                    dict["facid"] = element.facid;
                    if(N==0){
                        dict["id"]=0;
                    }
                    else{
                        dict["id"] = x[index] / N
                    }
                    arr.push(dict);
                }
                faculty = arr;
                //console.log(faculty);
                description = "Thermodynamics deals with energy, matter, and the laws governing their interactions. It is essential to learn its usefulness in the design of processes, devices, and systems involving effective utilization of  energy  and  matter.  The  course  emphasizes  on  the  fundamentals  and  concepts  of  the  laws  of thermodynamics  as   applied   to   control   mass   and   control   volume   systems.   Irreversibility   and availability are powerful tools in the design of thermodynamic systems";
                res.render('course', {
                    faculty: faculty,
                    rank: result,
                    user: req.user,
                    url: "BITS%20F111",
                    title: "BITS F111",
                    description: description,
                })
            .catch((err) => console.log(err));
        })
    });

    router.get('/BITS%20F112', (req, res)=>{
        var N,x=[0,0,0,0,0,0],faculty=[], arr=[];
            Rank.find({ courseId: "BITS F112" })//This is to find the total entries
                .then((result) => {
                    N = (result.length) - 1;
                    console.log(N);
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        x[0]+=element["id1"];
                        x[1]+=element["id2"];
                        x[2]+=element["id3"];
                        x[3]+=element["id4"];
                        x[4]+=element["id5"];
                        x[5]+=element["id6"];
                    }
                })
                .catch((err) => console.log(err));
            Faculty.find({courseId: "BITS F112"})
                .then((result)=>{
                    faculty = result;
                    for (let index = 0; index < faculty.length; index++) {
                        var element = faculty[index];
                        dict = {};
                        dict["name"] = element.name;
                        dict["facid"] = element.facid;
                        if(N==0){
                            dict["id"]=0;
                        }
                        else{
                            dict["id"] = x[index] / N
                        }
                        arr.push(dict);
                    }
                    faculty = arr;
                    //console.log(faculty);
                    description = "The main objective of the course is to help the learners develop skills in writing technical reports. The students will learn about the various stages involved informulating a problem, conducting astudyand presenting their findings in the form of a Technical Report. ";
                    res.render('course', {
                        faculty: faculty,
                        rank: result,
                        user: req.user,
                        url: "BITS%20F112",
                        title: "BITS F112",
                        description: description,
                    })
                .catch((err) => console.log(err));
            })
        });

module.exports= router;