const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    cpf:{type: Number},
    birthDate:{type: Date},
    areaCode:{type: Number},
    phone:{type: Number},
    cellphone:{type: Number},
    email:{type: String, default: 'Não informado'},
    street:{type: String, default: 'Não informado'},
    neighb:{type: String, default: 'Não informado'},
    addressCompl:{type: String, default: 'Não informado'},
    postalCode:{type: Number},
    city:{type: String, default: 'Não informado'},
    projectsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

module.exports = mongoose.model('Person', personSchema);