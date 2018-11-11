const express = require('express');
const router = express.Router();

const users = [
    {"id": 10, "name": "Elbereth Gilthoniel", "emailAddress": "elbereth@gilthoniel.com", "streetAddress": "381 Cat Mountain", "city": "Austin", "region":"Texas", "postalCode": "78727"},
    {"id": 11, "name": "Aredhel Ar-Fieniel", "emailAddress": "aredhel@arfieniel.com", "streetAddress": "506 N Water St", "city": "Salem", "region":"Indiana", "postalCode": "47167"},
    {"id": 12, "name": "Idril Celebrindal", "emailAddress": "idril@celebrindal.com", "streetAddress": "207 Ruxton Cir", "city": "Mashpee", "region":"Massachusetts", "postalCode": "02649"}
 ];

function mapUser(user, req) {
    user.name = req.body.name;
    user.emailAddress = req.body.emailAddress;
    user.streetAddress = req.body.streetAddress;
    user.city = req.body.city;
    user.region = req.body.region;
    user.postalCode = req.body.postalCode;
}

router.get('/users', (req, res) => {
 res.send(200, users)
});

router.get('/user/:id', (req, res) => {
    const idParam = req.params["id"];    
    var user = users.find( x => x.id == idParam);
    if (!user) {
        res.status(404).send(`User with id ${idParam} does not exist.`)
    }
    res.send(200, user);
});
   
router.put('/user/:id', function (req, res) {
    const idParam = req.params["id"];    
    var user = users.find( x => x.id == idParam);
    if (!user) {
        res.status(404).send(`User with id ${idParam} does not exist.`)
    }
    mapUser(user, req);
    res.send(200, user);      
  });
  
  router.post('/user', function (req, res) {
    var newElemId; 
    if (users.length > 0) {
        newElemId = users[users.length - 1].id + 1;
    }
    else {
        newElemId = 1;
    }

    let user = {};
    mapUser(user, req);
    user.id = newElemId;
    users.push(user);
    res.send(200, user);      
  });
  
  router.delete('/user/:id', function (req, res) {
    const idParam = req.params["id"];    
    const indToDelete = users.findIndex(u => u.id == idParam);
    if (indToDelete === -1) {
        res.status(404).send(`User with id ${idParam} does not exist.`)
    }

    users.splice(indToDelete, 1);
    res.send(200, {});
  });  

module.exports=router;