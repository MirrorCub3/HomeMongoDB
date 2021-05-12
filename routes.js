
// using the modules myDatabase, mongoose, and Home
// routes is not doing much here. just the request handlers
let path = require("path");
let express = require("express");
var mongoose = require("mongoose");   //new

let router = express.Router();

router.get("/",function(req,res){ // this is called when we access the root of the website
	res.sendFile(path.resolve(__dirname,"public/views/index.html"));
});

const myDatabase = require('./myDatabase');
let db = new myDatabase(); // this pointer to a my databse module

const Home = require('./HomeClass');

router.post('/create', function(req, res){ // routes holds all the request handlers
	if (req.body.name == "") {
		res.json({retVal:false});
		return;
	}
	let obj = new Home(req.body.identifier,req.body.name);
	return(db.postHome(obj,res));
});


router.get('/read', function(req, res){ // request handler
	return(db.getHome(req.query.identifier,res)); // making a request to the mydatabase and returning it
});



router.put('/update', function(req, res){
	if (req.body.name == "") {
		res.json({retVal:false});
		return;
	}
	let obj = new Home(req.body.identifier,req.body.name);
	return(db.putHome(obj,res)); //calling the mongoose database throught the instantiated pointer
	// passsing in the info from the client - in this case passing in the object of the Home to then make a document
});

router.delete('/delete/:identifier', function(req, res){
	return( db.deleteHome(req.params.identifier,res));
	// sending in the id
});


module.exports = router;
