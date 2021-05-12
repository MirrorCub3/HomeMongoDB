

let express = require('express');
var bodyParser = require('body-parser');

var mongoose = require("mongoose"); // mongoose package
mongoose.connect("mongodb://localhost/property"); // database used

var routes = require("./routes");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static('./public/js'));
app.use(routes);

let port = process.env.PORT || 3000;
app.listen(port);
