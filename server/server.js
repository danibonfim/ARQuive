
const customExpress = require("./customExpress");
const conection = require('./db/conection');
const tables = require('./db/tables');

conection.connect(erro => {
    if(erro) {
        console.logo(erro);
    } else{
        console.log('conectado com sucesso');

        tables.init(conection);
        const app = customExpress();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));
    }
});








