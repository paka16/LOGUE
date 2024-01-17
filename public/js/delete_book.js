// popup
function delete_popup(bookID) {
  if (confirm("Are you sure you wish to delete this book?") == true) {
      deleteBook(bookID);
  }
}

// delete book function
function deleteBook(bookID) {
    let link = '/books';
    let data = {
      id: bookID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(bookID);
      }
    });
  }

// update the table
function deleteRow(bookID){
  let table = document.getElementById("book-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == bookID) {
      table.deleteRow(i);
      break;
    }
  }
}

// remove from dropdown
function deleteDropDownMenu(bookID){
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(bookID)){
      selectMenu[i].remove();
      break;
    } 
  }
}