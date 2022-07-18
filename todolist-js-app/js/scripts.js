
function newItem(){
let listItem = $('input').val();
console.log(listItem);
// $('form').append("<li>`${listItem}`</li>");

// $('.form').append(listItem);
let li = $('<li></li>');
if (listItem === '') {
    alert("Not valid");
  } 
  else {  
    li.append(listItem)
    $('#list').sortable(li).append(li);
    
  }
// $('#list').append('<li>${listItem}</li>');
//Crossing an item out:
function crossOut() {
    li.toggleClass("strike");
}
li.on("dblclick", function crossOut() {
    li.toggleClass("strike");
});
//Adding a delete button
let crossOutButton = $('<crossOutButton></crossOutButton>');
crossOutButton.append(document.createTextNode('X'));
li.append(crossOutButton);
crossOutButton.on("click", deleteListItem);
    function deleteListItem(){
        li.addClass("delete")
    }
    // $('#list').sortable(li);
    li.sort();
}
// let deleteButton = '<button>Delete</button>'
// $('deleteButton').append('<li>X</li>');
//  deleteButton.append(document.createTextNode('X'));