const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/projects');


const Client = require('../models/person');

//-----OPTIONS--------------------

//get all clients

router.get('/',(req, res, next) => {
    Client.find({ type: 'client'})
        .exec()
        .then(doc =>{
            const response ={
                count: doc.length,
                client: doc.map(doc => {
                    return{
                        _id: doc._id,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        areaCode: doc.areaCode,
                        phone: doc.phone,
                        cellphone: doc.cellphone,
                        projectsId: doc.projectsId,
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

//get specific client

router.get('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    console.log(id);
    Client.findById(req.params.clientId)
        .exec()
        .then(doc =>{
            console.log( 'From Data Base', doc);

            if (doc === null){
                res.status(404).json({
                    message: 'No valid entry for provided ID'
                })

            }
            res.status(200).json({
                firstName: doc.firstName,
                lastName: doc.lastName,
                cpf: doc.cpf,
                birthDate: doc.birthDate,
                areaCode: doc.areaCode,
                phone: doc.phone,
                cellphone: doc.cellphone,
                email:doc.email,
                street: doc.street,
                neighb: doc.neighb,
                addressCompl: doc.addressCompl,
                city: doc.city,
                postalCode: doc.postalCode,
                projectsId: doc.projectsId
            }); 
        })

        .catch(err => {
            console.log(err)
             res.status(500).json({error:err});
        });

});



router.post('/', (req, res, next) => {
    const client= new Client({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cpf: req.body.cpf,
        birthDate: req.body.birthDate,
        areaCode: req.body.areaCode,
        phone: req.body.phone,
        cellphone: req.body.cellphone,
        email: req.body.email,
        street: req.body.street,
        neighb: req.body.neighb,
        addressCompl: req.body.addressCompl,
        city: req.body.city,
        postalCode: req.body.postalCode,
        projects: req.body.projectName
    });
    console.log(client);

    client.save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: 'A new client has been added!',
                createdClient:{
                    _id: result._id,
                    type: result.type,
                    firstName: result.firstName,
                    lastName:result.lastName,
                    cpf: result.cpf,
                    birthDate: result.birthDate,
                    areaCode: result.areaCode,
                    phone: result.phone,
                    cellphone: result.cellphone,
                    email: result.email,
                    street: result.street,
                    neighb: result.neighb,
                    addressCompl: result.addressCompl,
                    city: result.city,
                    postalCode: result.postalCode,
                    projectsId: result.projectsName
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});





router.delete('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    Client.deleteOne({_id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'The client has been deleted!',
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