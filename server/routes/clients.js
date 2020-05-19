const Client = require('../db/models/clients');


module.exports = app =>{
    app.get('/clientes', (req, res)=>
        Client.all(res)
    )

    app.get('/clientes/:id', (req, res) => 
        Client.get(req.params.id, res)
    )
}