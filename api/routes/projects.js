const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const FKConstrain = require('../helpers/foreignKey')
//getting Schema
const Project = require('../models/projects');

//-----HANDLING IMAGES--------------------
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || 'image/png' ){
        cb(null, true);
    }else{
        cb(new Error('File format not supported'), false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize:  1024* 1024 * 5 //5megas
    },
    fileFilter: fileFilter,
});

//-----OPTIONS--------------------

//All Projects
router.get('/',(req, res, next) => {
    Project.find(req.query)
        .exec()
        .then(doc =>{
            const response ={
                count: doc.length,
                projects: doc.map(doc => {
                    return{
                        _id: doc._id,
                        name: doc.name,
                        startDate: doc.start,
                        finishDate: doc.finish,
                        services: doc.services,
                        price: doc.price,
                        projectImage: doc.projectImage,
                        personId: doc.personId
                    }
                })
            }
            console.log(doc);
            res.status(200).json(response);
        })
        .catch(error=>{
        console.log(error);
        res.status(500).json({
             error: err
        });

    });
});

//Project by ID
router.get('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id)
        .populate('personId', 'firstName lastName cellphone')
        .exec()
        .then(doc =>{
            console.log( 'From Data Base', doc);

            if (doc === null){
                res.status(404).json({
                    message: 'No valid entry for provided ID'
                })

            }
            res.status(200).json({
                _id: doc._id,
                name: doc.name,
                startDate: doc.start,
                finishDate: doc.finish,
                services: doc.services,
                price: doc.price,
                projectImage: doc.projectImage,
                personId: doc.personId
            }); 
        })

        .catch(err => {
            console.log(err)
             res.status(500).json({error:err});
        });

});


//___________________________________________________________
//___________________________________________________________


router.post('/', upload.single('projectImage'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    const imagePath = req.file.path;

    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        start: req.body.start,
        finish: req.body.finish,
        services: req.body.services,
        price: req.body.price,
        projectImage: req.file.path,
        personId: req.body.personId,
    });

    project.save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: 'A new project has been created!',
                createdProject:{
                    name: result.name,
                    _id: result._id,
                    start: result.start,
                    finish: result.inish,
                    services: result.services,
                    price: result.price,
                    projectImage: result.path,
                    personId: result.personId,
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });

            //handling the image upload even tough the project was not added because of error
            fs.unlink(`${imagePath}`, (err) => {
                if (err) throw err;
                console.log('The image was deleted');
              });


        });
});



//___________________________________________________________
//___________________________________________________________



router.patch('/:projectId',(req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {};
    req.body.forEach(element => {
        updateOps[element.propName] = element.value;
    });

    Project.updateOne({_id: id,}, {$set: updateOps})
        .exec()
        .then(result=>{
            console.log(result);
            
            res.status(200).json({
                message: `The Project has been updated!`
            })
        })
        .catch(error =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
    });
});


router.delete('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.deleteOne({_id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'The project has been deleted!',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});


module.exports = router;