

var express = require("express");
var mongoose = require("mongoose"); // how we acecess/use th mongo db
var StudentModel = require("./models/Student"); // different than the student module - located in
const Student = require('./Student'); // the in code version of a student

let myDatabase = function() {
}


                    //vv this is the function name called from routes
myDatabase.prototype.postStudent = function(student,res) { // the acessing the databse code
  let obj = {ident:student.ident,name:student.name}; // storing info into a js object
// VV the mongoose call to the student model to store the info . create is once of the given databasee commands
  StudentModel.create(obj,function(error,info) { // creating this document in the database
      // callback function
      if (error) { // if error then dont send back true
          return res.json({retVal:false}); // this is done inside of the callback since it's only here that the request is a actually completed
      }
      return res.json({retVal:true});
  });
  //DONT PUT A RES.JSON HERE. ALWAYS PU IT IN THE CALLBACK OR ELESE THE CODE WILL BE CALLED OUT OF ORDER (thinks the proces is done when it's really not)
}

myDatabase.prototype.getStudent = function(ident,res) {
    // searches the database for the name ident and then an id that matches the given value
  StudentModel.find({ident:ident},function(error,info) { // findng the syudnt of tht particular id and getting a pointer to it -----> info
      if (error) { // error if the db doesnt exists
          return res.json({retVal:null});
      }
      else if (info == null) { // data will be null if it doent find the studentt
          return res.json({retVal:null});
      }

      if (info.length == 1)// if the information returned is 1 then we did get out reqyuested info
        return res.json({ retVal: new Student(ident,info[0].name) }); // send that info to the client
      else
          return res.json({retVal:null}); // if the return isnt 1, then we'll also assume its a bad read
   });
}



myDatabase.prototype.putStudent = function(student,res) {
  let obj = {ident:student.ident,name:student.name};
  StudentModel.findOneAndUpdate({ident:student.ident},{name:student.name},function(error,oldStudent) {
    if (error) {
      return res.json({retVal:false});
    }
    else if (oldStudent == null) {
      return res.json({retVal:false});
    }
    return res.json({retVal:true});
  });
}

myDatabase.prototype.deleteStudent = function(ident,res) {
    StudentModel.remove({ident:ident},function(error,removed) {
        if (error) {
            return res.json({retVal:false});
        }
        if (removed.result.n == 0)
          return res.json({retVal:false});
        return res.json({retVal:true});
    });
}

module.exports = myDatabase;
