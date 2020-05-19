const conection = require('../conection');

class newPartner{
    add(partner){
        const sql = `insert into partners(pt_name, pt_service, pt_street, pt_neighborhood, pt_street_number, pt_postal_code, pt_area_code, pt_phone, pt_cellphone, pt_email)
                    VALUES ('${partner.pt_name}', '${partner.pt_service}', '${pt_street}', '${pt_neighborhood}', '${pt_street_number}', '${pt_postal_code}', '${pt_area_code}', '${pt_phone}', '${pt_cellphone}', '${pt_email}')`;

        conection.query(sql, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                console.log(results);
            }
        })
    }
}

module.exports = new newPartner;