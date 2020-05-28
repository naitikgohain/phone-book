const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
const db = require('./queries');

app.get('/api/contacts', db.getContacts);
app.post('/api/contacts', db.addContact);
app.get('/testing', (req, res) => {
    res.json('hellow orold');
});
app.listen(port, () => {
    console.log('Started the webapp. Running on port ${port}.');
});