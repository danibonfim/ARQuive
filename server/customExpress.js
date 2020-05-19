const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


module.exports=()=>{
    const app = express();
    const path = require("path");
    app.use(express.static(path.join(__dirname, "../public")));

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());


    //o consign compilará os comenados (Get..) de todos os arquivos
    consign()
        .include('routes')
        .into(app)

    return app;
}

