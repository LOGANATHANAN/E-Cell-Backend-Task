const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    }
});

const User=mongoose.model('User',UserSchema);


router.get('/',(req,res)=>{
    res.render('users');
});

router.get('/auth',(req,res)=>{
    res.render("auth");
});

router.get('/getinfo',(req,res)=>{
    const name=req.body.name;
    let errors=[];
    User.findOne({name:name})
    .then(user=>{
        if(user){
            req.flash('msg',JSON.parse(user.msg));
            console.log(user.msg)
        }
        else{
            console.log('Do not exist');
        }
    })
    .catch(err=>{
            console.log(err);
    })

})
router.post('/user',(req,res)=>{
    const {name,email,msg}=req.body;
    let errors=[];
    if(!name || !email || !msg){
        errors.push('Please Fill All Fields');
    }
    const newuser=new User({
        name:name,
        email:email,
        msg:msg
    })
    newuser.save()
    .then(user=>{
        req.flash('success_msg','Message is sent Sucessfully!')
        res.redirect('/');
    })
    .catch(err=>{
        req.flash('error_msg','Something went wrong!');
        console.log(err);
    })

})


module.exports=router;