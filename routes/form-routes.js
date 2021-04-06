const router= require('express').Router();
const Rank = require('../models/rank');
const Faculty= require('../models/faculty');

router.get('/BITS%20F110', (req, res)=>{
    Faculty.find({courseId: "BITS F110"}).sort()
    .then((result)=>{
        res.render('form', {
            title: "BITS F110| Form",
            courseId:"BITS F110",
            route:"BITS%20F110", 
            user: req.user, 
            faculty: result, 
            year: req.user.email.slice(1,5)
        });
    })
    .catch((err)=>console.log(err));
})

router.get('/BITS%20F111', (req, res)=>{
    Faculty.find({courseId: "BITS F111"}).sort()
    .then((result)=>{
        res.render('form', {
            title: "BITS F111| Form",
            courseId:"BITS F111",
            route:"BITS%20F111", 
            user: req.user, 
            faculty: result, 
            year: req.user.email.slice(1,5)
        });
    })
    .catch((err)=>console.log(err));
})

router.get('/BITS%20F112', (req, res)=>{
    Faculty.find({courseId: "BITS F112"}).sort()
    .then((result)=>{
        res.render('form', {
            title: "BITS F112| Form",
            courseId:"BITS F112",
            route:"BITS%20F112", 
            user: req.user, 
            faculty: result, 
            year: req.user.email.slice(1,5)
        });
    })
    .catch((err)=>console.log(err));
})


//POST Routes
router.post('/BITS%20F110',(req, res)=>{
    const rank = new Rank(req.body);
    rank.save()
    .then((result)=>{
        res.redirect('/profile/BITS%20F110');
    })
    .catch((err)=>console.log(err));
});

router.post('/BITS%20F111',(req, res)=>{
    const rank = new Rank(req.body);
    rank.save()
    .then((result)=>{
        res.redirect('/profile/BITS%20F111');
    })
    .catch((err)=>console.log(err));
});

router.post('/BITS%20F112',(req, res)=>{
    const rank = new Rank(req.body);
    rank.save()
    .then((result)=>{
        res.redirect('/profile/BITS%20F112');
    })
    .catch((err)=>console.log(err));
})

module.exports= router;