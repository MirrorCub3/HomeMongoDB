
const Student = require('./Student');

let myDatabase = function() {
	this.students = [];
}

let studentIndex = 0;

myDatabase.prototype.displayStudents = function() {
	for (let i=0;i<this.students.length;i++) {
		console.log(this.students[i]);
	}
}

myDatabase.prototype.postStudent = function(student,res) {
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && this.students[i].ident == student.ident) {
      res.json({retVal:false});
			//^^ res.json is what is telling the lient that the code is done - the only way we know were done and the success can be called
      return;
    }
  }
	this.students[studentIndex++] = new Student(student.ident,student.name);
  res.json({retVal:true});

}

myDatabase.prototype.getStudent = function(ident,res) {
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && ident == this.students[i].ident)
		{
      res.json({retVal:new Student(this.students[i].ident,this.students[i].name)})
      return;
		}
  }
  res.json({retVal:null});
}

myDatabase.prototype.putStudent = function(student,res) {
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && this.students[i].ident == student.ident) {
      this.students[i] = new Student(student.ident,student.name);
      res.json({retVal:true}); // this is the array so the data is being stored right here
      return;
    }
  }
  res.json({retVal:false});

}

myDatabase.prototype.deleteStudent = function(ident,res) {
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && ident == this.students[i].ident) {
			  let tempPtr = this.students[i];
        this.students[i] = undefined;
       res.json({retVal:tempPtr})
        return;
    }
  }
  res.json({retVal:null});
}

module.exports = myDatabase;
