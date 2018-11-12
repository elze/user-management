const express = require('express');
const router = express.Router();

var mysql = require('mysql')

// Since the connection string contains my personal credentials to my MySQL database, I don't want to check them into Github,
// so I put stars there instead.
var connection = mysql.createConnection({
  host     : '*****',
  user     : '*****',
  password : '*****',
  database : '*****'
});

connection.connect(function(err) {
    if (err) {
        console.log("Error occurred trying to connect to database: ");    
        console.log(err);    
    }
});


var userFields = ["id", "name", "emailAddress", "streetAddress", "city", "region", "postalCode"];

function mapUser(user, record) {
    user.id = record.id;
    user.name = record.name;
    user.emailAddress = record.emailAddress;
    user.streetAddress = record.streetAddress;
    user.city = record.city;
    user.region = record.region;
    user.postalCode = record.postalCode;
}

router.get('/users', (req, res) => {
    const userFieldNames = userFields.join(', ', userFields);
    connection.query(`SELECT ${userFieldNames} FROM user`, function (err, rows, fields) {
        if (err) {
            console.log("Get users: Error getting all users from the database: ");    
            console.log(err);        
            res.send(500, {});
        }
        let dbUsers = []; 
        rows.map(row => {
            let user = {};
            mapUser(user, row);
            dbUsers.push(user);
        });
        res.send(200, dbUsers);
    });
});

router.get('/user/:id', (req, res) => {
    const idParam = req.params["id"];    
    const userFieldNames = userFields.join(', ', userFields);
    const userQuery = `SELECT ${userFieldNames} FROM user WHERE id=?`;
    const preparedQuery = mysql.format(userQuery, idParam); 
    connection.query(preparedQuery, function (err, rows, fields) {
        if (err) {
            console.log(`Get user with id=${idParam}: Error occurred trying to get the user from the database: `);    
            console.log(err);        
            res.send(500, {});
        }
        if (rows.length === 0) {
            res.status(404).send(`User with id ${idParam} does not exist.`)                
        }
        let user = {};
        mapUser(user, rows[0]);
        res.send(200, user);
    });
});
   
router.put('/user/:id', function (req, res) {
    const idParam = req.params["id"];        
    const userQuery = `UPDATE user SET name='${req.body.name}', emailAddress='${req.body.emailAddress}', streetAddress='${req.body.streetAddress}', city='${req.body.city}', region='${req.body.region}', postalCode='${req.body.postalCode}' WHERE id=?`;    
    const preparedQuery = mysql.format(userQuery, idParam); 
    connection.query(preparedQuery, function (err, rows, fields) {
        if (err) {
            console.log(`put: error occurred trying to update user with id=${idParam}`);    
            console.log(err);    
            res.send(500, {});
        }
        res.send(200, {});
    });
});
  
router.post('/user', function (req, res) {
    let user = {};
    mapUser(user, req.body);

    const insertUserFields = userFields.slice(1);
    const userFieldNames = insertUserFields.join(', ');
    let placeholders = '?,'.repeat(insertUserFields.length);
    placeholders = placeholders.slice(0, -1);

    const userQuery = `INSERT INTO user (${userFieldNames}) VALUES (${placeholders})`;    
    const preparedQuery = mysql.format(userQuery, [req.body.name, req.body.emailAddress, req.body.streetAddress, req.body.city, req.body.region, req.body.postalCode]); 
    connection.query(preparedQuery, function (err, rows, fields) {
        if (err) {
            console.log(`post: error occurred trying to insert a user`);    
            console.log(err);    
            res.send(500, {});
        }
        const lastInsertIdQuery = "SELECT LAST_INSERT_ID() AS last_insert_id;";
        connection.query(lastInsertIdQuery, function (err, rows, fields) {
            if (err) {
                console.log(`post: error occurred trying to get ID of the last inserted user record`);    
                console.log(err);    
                res.send(500, {});
            }        
            const lastInsertId = rows[0]["last_insert_id"];
            user.id = lastInsertId;
            res.send(200, user);
        });
    });
});
  
router.delete('/user/:id', function (req, res) {
    const idParam = req.params["id"];    

    const userQuery = `DELETE FROM user WHERE id=?`;    
    const preparedQuery = mysql.format(userQuery, idParam); 
    connection.query(preparedQuery, function (err, rows, fields) {
        if (err) {
            console.log(`delete: error occurred trying to delete user with id=${idParam}`);    
            console.log(err);    
            res.send(500, {});
        }
        res.send(200, {});
    });
});  

module.exports=router;