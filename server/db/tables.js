class tables{
    init(conection){
        this.conection = conection;
        this.createPartners();
    }

    createPartners(){
        const sql = 'CREATE TABLE IF NOT EXISTS partners (pt_id INT PRIMARY KEY AUTO_INCREMENT,pt_name VARCHAR(20) NOT NULL, pt_service VARCHAR(20) NOT NULL, pt_street VARCHAR(50),pt_neighborhood VARCHAR(50),pt_street_number INT(10),pt_postal_code INT(20),pt_area_code INT(20),pt_phone INT(20),pt_cellphone INT(20),pt_email VARCHAR(50))'
        this.conection.query(sql, (err) =>{
            if(err){
                console.log(err);
            }else{
                console.log("Tabela partners criada com sucesso");
            }
         })

    }

}

module.exports = new tables;


