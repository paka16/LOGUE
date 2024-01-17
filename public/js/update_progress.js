
// Get the objects we need to modify
let updateBookForm = document.getElementById('update-progress-form');

// Modify the objects we need
updateBookForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let inputSelectedBook = document.getElementById("selectedBook");
    let inputProgress = document.getElementById("input-progress-update");
    let inputRating = document.getElementById("input-rating-update");

    let selectedBookValue = inputSelectedBook.value;
    let progressValue = inputProgress.value;
    let ratingValue = inputRating.value;
    
    if (isNaN(progressValue)) 
    {
        return;
    }

    if (isNaN(ratingValue)) 
    {
        return;
    }

    let data = {
        selectedBook: selectedBookValue,
        progress: progressValue,
        rating: ratingValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PATCH", "/books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectedBookValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Input error")
        }
    }
    xhttp.send(JSON.stringify(data));

})

// update table
function updateRow(data, bookID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("book-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       
       if (table.rows[i].getAttribute("data-value") == bookID) {

           
            let updateRowIndex = table.getElementsByTagName("tr")[i];

           
            let td = updateRowIndex.getElementsByTagName("td")[3];

            
            td.innerHTML = parsedData[0].name; 
       }
    }
}