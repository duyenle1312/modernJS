const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
 res.sendFile(`${__dirname}/index.html`);
});

app.get('/hi', (req, res) => {
 res.send(JSON.stringify("Hello!"));
});

// listen for requests :)
var listener = app.listen(1307, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});