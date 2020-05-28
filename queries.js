const pg = require('pg')

/*const searchContacts = (request, response) => {
    con.query('SELECT t1.contactid, t1.dob, t1.name,')
}*/

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'phonebook',
    port: 5432,
});

const searchContacts = (request, response) => {
    let q = request.query['q'];

    q = '%' + q + '%';
    //console.log(q);
    pool.query("SELECT a.contact_id, a.name, a.dob, string_agg(DISTINCT(b.email) , ',') as emails , string_agg(DISTINCT(c.phoneno) , ',') as mobile from contact_master a, email_master b, phone_master c where a.contact_id = b.contact_id and a.contact_id = c.contact_id  and (a.name SIMILAR TO $1 or c.phoneno SIMILAR TO $1 or b.email SIMILAR TO $1) group by a.contact_id  ORDER BY a.name ASC", [q], (error, results) => {
        if (error) {
            throw error
        }
        //console.log(results.rows);
        response.status(200).json(results.rows);
    })
}

const getContacts = (request, response) => {
    //SELECT t1.contactid, t1.dob, t1.name, t2.phoneno, t3.email FROM contact_master as t1 JOIN phone_master as t2 on t1.contactid = t2.contactid JOIN email_master as t3 on t1.contactid = t3.contactid ORDER BY t1.name AS
    /*pp.pool.query("SELECT t1.contactid, t1.dob, t1.name, string_agg(DISTINCT t2.phoneno, ',') FROM contact_master as t1 JOIN phone_master as t2 on t2.contactid = t1.contactid JOIN email_master as t3 on t3.contactid = t1.contactid GROUP BY t1.contactid", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })*/
    pool.query("select  a.contact_id, a.name  , a.dob  , string_agg(DISTINCT(b.email) , ',') as emails , string_agg(DISTINCT(c.phoneno) , ',') as mobile  from contact_master a , email_master b , phone_master c where a.contact_id  = b.contact_id  and a.contact_id  = c.contact_id  group by a.contact_id ORDER BY a.name ASC", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
    })
}

const addContact = (request, response) => {
    console.log(request.body);
    let emailList, phoneList;
    let j = request.body;
    console.log(JSON.stringify(j));
    const { name, dob, phone, email } = j;
    phoneList = phone;
    emailList = email;
    //phoneList = JSON.parse(phone);
    //if (email != '') {
    //    emailList = JSON.parse(email);
    //}
    pool.query('INSERT into contact_master(dob, name) values ($1, $2) RETURNING contact_master.contact_id', [dob, name], (error, results) => {
        if (error) {
            throw error
        }
        for (var i = 0; i < phoneList.length; i++) {
            pool.query('INSERT into phone_master(contact_id, phoneno) values ($1, $2)', [results.rows[0].contact_id, phoneList[i]], (error, results_phone) => {
                if (error) {
                    throw error
                }
            })
        }
        if (email != '') {
            for (var i = 0; i < emailList.length; i++) {
                pool.query('INSERT into email_master(contact_id, email) values ($1,$2)', [results.rows[0].contact_id, emailList[i]], (error, results_email) => {
                    if (error) {
                        throw error;
                    }
                })
            }
        }
        response.status(200).json(results.rows[0].contact_id)
    })
}


module.exports = {
    getContacts,
    addContact,
    searchContacts
}