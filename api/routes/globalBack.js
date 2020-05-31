
const {s3} = require('../../config');
const Project = require('../models/projects');
const Client = require('../models/person');


module.exports = {
    deleteProjectAndImage,
    delImageS3,
}

function deleteProjectAndImage(projectId){
    let query = Project.where({
        _id: projectId
    });

    query.findOne((err, project) => {
        delImageS3(project.projectImage)
    });

    Project.deleteOne({_id: projectId})
        .exec()
        .then( result => {
            console.log('O projeto foi apagado', result)
        })
        .catch(err => {
            console.log(err);
        });
};





function delImageS3(projectImage){
    let split = projectImage.split('/');

    console.log('image key:', split[split.length - 1])

    let params = {
        Bucket: 'arquive',
        Key: split[split.length - 1]
      };
      
      s3.deleteObject(params, function(err, data) {
        if (err) console.log('S3 DEBUG ERRO',err, err.stack); // an error occurred
        else     console.log('A imagem foi apagada', data);           // successful response
      })
}