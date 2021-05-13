

var express = require("express");
var mongoose = require("mongoose"); // how we acecess/use th mongo db
var HomeModel = require("./models/Homeclass"); // different than the student module - located in
const Home = require('./Homeclass'); // the in code version of a student

let myDatabase = function() {
}


                    //vv this is the function name called from routes
myDatabase.prototype.postHome = function(home,res) { // the acessing the databse code
  let obj = {ident:home.ident,style:home.style,cost:home.cost,view:home.view}; // storing info into a js object
// VV the mongoose call to the student model to store the info . create is once of the given databasee commands
  HomeModel.create(obj,function(error,info) { // creating this document in the database
      // callback function
      if (error) { // if error then dont send back true
          return res.json({retVal:false}); // this is done inside of the callback since it's only here that the request is a actually completed
      }
      return res.json({retVal:true});
  });
  //DONT PUT A RES.JSON HERE. ALWAYS PU IT IN THE CALLBACK OR ELESE THE CODE WILL BE CALLED OUT OF ORDER (thinks the proces is done when it's really not)
}

myDatabase.prototype.getHome = function(ident,res) {
    // searches the database for the name ident and then an id that matches the given value
  HomeModel.find({ident:ident},function(error,info) { // findng the syudnt of tht particular id and getting a pointer to it -----> info
      if (error) { // error if the db doesnt exists
          return res.json({retVal:null});
      }
      else if (info == null) { // data will be null if it doent find the studentt
          return res.json({retVal:null});
      }

      if (info.length == 1){// if the information returned is 1 then we did get out reqyuested info
        return res.json({ retVal: new Home(ident,info[0].style,info[0].cost,info[0].view) }); // send that info to the client
      }else
          return res.json({retVal:null}); // if the return isnt 1, then we'll also assume its a bad read
   });
}



myDatabase.prototype.putHome = function(home,res) {
  let obj = {ident:home.ident,name:home.name};
  HomeModel.findOneAndUpdate({ident:home.ident},{style:home.style,cost:home.cost,view:home.view},function(error,oldHome) {
    if (error) {
      return res.json({retVal:false});
    }
    else if (oldHome == null) {
      return res.json({retVal:false});
    }
    return res.json({retVal:true});
  });
}

myDatabase.prototype.deleteHome = function(ident,res) {
    HomeModel.remove({ident:ident},function(error,removed) {
        if (error) {
            return res.json({retVal:false});
        }
        if (removed.result.n == 0)
          return res.json({retVal:false});
        return res.json({retVal:true});
    });
}

module.exports = myDatabase;
