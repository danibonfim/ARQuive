//-----NPM MIDDLEWARES-----------------------
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const formData = require('express-form-data');
const os = require("os");

//-----PATH ROUTES-----------------------
const projectRoutes = require('./api/routes/projects');
const clientRoutes = require('./api/routes/clients');
const teamRoutes = require('./api/routes/team');

//-----MONGODB CONECTION WITH MONGOOSE--------------------
mongoose.connect(
    'mongodb+srv://daniela:animal11@arquivedb-3ewau.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

//------URL HOST  HEROKU ---------------------------------

const url = 'https://arquive.herokuapp.com'




// const url = 'mongodb://127.0.0.1:27017/ARQuive'
// mongoose.connect(url, { useUnifiedTopology: true })
// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })

mongoose.Promise = global.Promise;



//-----NODE USE MIDDLEWARE--------------------
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use(express.static(path.join(__dirname, "/public")));
// app.use(formData.parse()); // Midleware for reading multipart/form-data
const options = {
    uploadDir: 'uploads',
    autoClean: false
};
   
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
 
//-----CORS ERRORS--------------------
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELE, GET')
        return res.status(200).json({});
    };
    next();
});

//-----APP ROUTES--------------------
app.use('/projects', projectRoutes);
app.use('/clients', clientRoutes);
app.use('/team', teamRoutes);


//handling routes errors in general
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error); 
});

//-----HANDLING ERROS IN GENERAL------
app.use((error, req, res, next)=>{
    res.status(error.status ||500);
    res.json({
        error:{
            message: error.message
        }
    });

});



module.exports = app;