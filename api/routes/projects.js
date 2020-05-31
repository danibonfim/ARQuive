const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
//getting Schema
const Project = require('../models/projects');
const globalFunction = require('./globalBack')
const {upload, s3} = require('../../config');



//-----HANDLING IMAGES MULTER--------------------
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
//     }
// });

// const fileFilter = (req, file, cb)=>{
//     if(file.mimetype === 'image/jpeg' || 'image/png' ){
//         cb(null, true);
//     }else{
//         cb(new Error('File format not supported'), false);
//     }
// };

// const upload = multer({
//     storage: storage, 
//     limits: {
//         fileSize:  1024* 1024 * 5 //5megas
//     },
//     fileFilter: fileFilter,
// });




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
                        start: doc.start,
                        finish: doc.finish,
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
                start: doc.start,
                finish: doc.finish,
                services: doc.services,
                area: doc.area,
                price: doc.price,
                projectImage: doc.projectImage,
                street: doc.street,
                neighb: doc.neighb,
                addressCompl: doc.addressCompl,
                city: doc.city,
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


router.post('/', upload.single('projectImage'),(req, res, next) => {

    console.log(req.file)
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        start: req.body.start,
        finish: req.body.finish,
        area:req.body.area,
        services: req.body.services,
        price: req.body.price,
        projectImage: req.file.location,
        personId: req.body.personId,
        street:req.body.street,
        neighb:req.body.neighb,
        addressCompl:req.body.addressCompl,
        city:req.body.city,
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
                    finish: result.finish,
                    area: result.area,
                    services: result.services,
                    price: result.price,
                    projectImage: result.projectImage,
                    street: result.street,
                    neighb: result.neighb,
                    addressCompl: result.addressCompl,
                    city: result.city,
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

    let query = Project.where({
        _id: id
    });

    query.findOne((err, project) => {
        globalFunction.delImageS3(project.projectImage)
    });

    Project.deleteOne({_id: id})
        .exec()
        .then( result => {

            console.log(result)

            res.status(200).json({
                message: 'The project has been deleted!',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});


module.exports = router;

                     
