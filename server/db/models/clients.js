const conection = require('../conection');

class Client{
   
    all(res){
        const sql = `SELECT * FROM people WHERE type_id=1;`;

        conection.query(sql, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.send(results);
            }
        })
    }

    get(id, res){
        const sql = `SELECT * FROM people WHERE type_id=1 AND pp_id=${id};`;

        conection.query(sql, (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
        })
    }
}

module.exports = new Client;
