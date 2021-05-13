

var mongoose = require("mongoose");
//the actual document created and sent to the db - the real model sent to the db
                              //VV the collections name in the db
var Home = mongoose.model("Homes",{ // creating a mongoose model(document) - differnt than the other student.js
	ident: {
		required: true, // every document in the mongo db database MUST have a ident
		unique: true, // MUSt be unique
		type:Number // this stores it's type - the id must be a number - better to specify than to not
	},
	style: String, // the name doestn have to be unique since it wasnt specified to be
	cost: Number,
	view: Boolean
});

module.exports = Home;
