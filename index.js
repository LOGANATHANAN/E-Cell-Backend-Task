require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const expressLayouts=require('express-ejs-layouts');
const flash=require('connect-flash');
const session=require('express-session');
const app=express();
const db=process.env.DB_URL;

const connect = mongoose
  .connect(db, { useFindAndModify: false,useUnifiedTopology:true,useNewUrlParser:true })
  .then(() => console.log("Mondo db connected...."))
  .catch((err) => console.log(err));


app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.msg=req.flash('msg');
    next();
});

app.use('/',require('./api/router'));


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server has started on port ${PORT}`));
