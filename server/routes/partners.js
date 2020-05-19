const newPartner = require('../db/models/partners');


module.exports = app =>{
    app.get('/parceiros', (req, res)=>
        res.send('você está na rota de parceiros e está realizando um GET')
    )

    app.post('/parceiros', (req,res) => {
        const addPartner = req.body;

        newPartner.add(addPartner);
        // res.send('Você está na rota parceiros e está realizando um POST');
    }
    )
}