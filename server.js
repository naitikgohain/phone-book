const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(express.static(__dirname + '/public'));
/*app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/phone-book/index.html'));
});*/
/*app.get('', function(req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});*/
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
const db = require('./queries');

app.post('/api/checkUniquePhone', db.checkUniquePhone);
app.delete('/api/deleteContact', db.deleteContact);
app.post('/api/addPhone', db.addPhoneToContact);
app.post('/api/addEmail', db.addEmailToContact);
app.put('/api/updatePhone', db.updatePhoneById);
app.put('/api/updateEmail', db.updateEmailById);
app.get('/api/phoneDetails', db.getPhoneDetails);
app.get('/api/emailDetails', db.getEmailDetails);
app.get('/api/search', db.searchContacts);
app.put('/api/updateContact', db.updateContact);
app.get('/api/contacts', db.getContacts);
app.post('/api/contacts', db.addContact);
/*app.listen(process.env.PORT || 8080);*/
app.listen(port, () => {
    console.log('Started the webapp. Running on port ${port}.');
});