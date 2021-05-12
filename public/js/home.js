
function readClicked(){// these functions send requests to the routes, holds all the connections and callbacks
    $.ajax({
      url: "/read",
      type: "GET",
      data: {identifier:$("#identifier").val()},// sends in id ,gets info
      success: function(data){ // the sucess call back does not occur until the server is done with the get request - has to completly finish
        if (!data) //if there wa no data retured from routes, bad
          alert("bad read");
        else if (data.retVal) {
          $("#name").val(data.retVal.name);
          alert("good read");
        } else // or if there was null/false retuned from the database, bad
          alert("bad read");
      } ,
      dataType: "json"
    });
  return false;
}
function clearClicked(){// these functions send requests to the routes, holds all the connections and callbacks
    $("#style").val("Spanish");
    $("#cost").val(0);
    $("#view").prop('checked', false);
  return false;
}
function createClicked(){
    $.ajax({
      url: "/create",
      type: "POST",
      data: {identifier:$("#identifier").val(),style:$("#style").val(),
      cost:$("#cost").val(),view:$("#view").prop("checked")}, // send in data to create document
      success: function(data){
        if (!data)
          alert("bad create");
        else if (data.retVal)
          alert("good create");
        else
          alert("bad create");
        } ,
      dataType: "json"
    });
  return false;
}
function updateClicked(){
    $.ajax({
      url: "/update",
      type: "PUT",
      data: {identifier:$("#identifier").val(),style:$("#style").val(),
      cost:$("#cost").val(),view:$("#view").prop("checked")}, // send in new data to replace old
      success: function(data){
        if (!data)
          alert("bad update");
        else if (data.retVal)
          alert("good update");
        else
          alert("bad update");
      } ,
      dataType: "json"
    });
  return false;
}
function deleteClicked(){
    $.ajax({
      url: "/delete/" + Number($("#identifier").val()), // sending in the id and deleting
      type: "DELETE",
      success: function(data) {
        if (!data)
          alert("bad delete");
        else if (data.retVal)
          alert("good delete");
        else
          alert("bad delete");
      } ,
      dataType: "json"
    });
    return false;
}
$(document).ready(function(){ // connecting buttons to the script
  $("#readButton").click(readClicked);
  $("#createButton").click(createClicked);
  $("#updateButton").click(updateClicked);
  $("#deleteButton").click(deleteClicked);
  $("#clearButton").click(clearClicked);
});
