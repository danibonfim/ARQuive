//----UPLOAD TO AMAZON S3 ----- install aws-sdk and multer-S3
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const dotenv= require('dotenv');
dotenv.config();

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID ,
    secretAccessKey: process.env.ASECRET_ACCESS_KEY,
    region:'us-east-2',
});
 
const s3 = new aws.S3();



const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || 'image/png' ){
        cb(null, true);
    }else{
        cb(new Error('File format not supported'), false);
    }
};


const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        acl: 'public-read', //turning the image public
        bucket: 'arquive',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            let fileName = file.originalname.toString();
            let split = fileName.split('.');
            let extension = split[1];
            cb(null, Date.now().toString() + '.' + extension)
        }
  })
})

module.exports = upload