const mongoose = require('mongoose');
const FKHelper = require('../helpers/foreignKey');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true, unique: true},
    start:{type: Date, required:true},
    finish:{
        type: Date,
        max: Date(),
        default: null},
    services:{type: Array, required: true},
    price:{type: Number, required:true},
    projectImage:{type: String, required: true},
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required:true,
        FKconstraint:{
            isAsync: true,
            validator: validator =>{
                FKHelper(mongoose.model('Person'), validator);
            },
            message: `Person doesn't exist`,
        },
    }
});

module.exports = mongoose.model('Project', projectSchema);