//-----NPM MIDDLEWARES-----------------------
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const dotenv= require('dotenv');

//-----PATH ROUTES-----------------------
const projectRoutes = require('./api/routes/projects');
const clientRoutes = require('./api/routes/clients');
const teamRoutes = require('./api/routes/team');

//-----MONGODB CONECTION WITH MONGOOSE--------------------
dotenv.config();
const MONGODBURI = process.env.MONGODB_URI;
mongoose.connect(MONGODBURI || 'mongodb://127.0.0.1:27017/ARQuive',
    {useNewUrlParser: true, 
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
})

mongoose.Promise = global.Promise;



//-----NODE USE MIDDLEWARE--------------------
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use(express.static(path.join(__dirname, "/public")));

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