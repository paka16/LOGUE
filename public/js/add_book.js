let addBookForm = document.getElementById('add-book-form'); 

// Modify the objects we need
addBookForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputAuthor = document.getElementById("input-author");
    let inputGenres = document.getElementById("input-genres");
    let inputRatings = document.getElementById("input-ratings");
    let inputProgress = document.getElementById("input-progress");
    let inputISBN = document.getElementById("input-isbn");
    let inputReview = document.getElementById("input-review");


    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let authorValue = inputAuthor.value;
    let progressValue = inputProgress.value;
    let genreValue = inputGenres.value;
    let isbnValue = inputISBN.value;
    let ratingValue = inputRatings.value;
    let reviewValue = null;

    // prevent sql error
    if (inputRatings === null) {
        ratingValue = null;
    } else {
        ratingValue = inputRatings.value;  
    }
    if (inputProgress !== null) {
        progressValue = inputProgress.value;
    } else {
        progressValue = null;
    }
    if (inputISBN !== null) {
        isbnValue = inputISBN.value;
    } else {
        isbnValue = null;
    }

    let data = {
        title: titleValue,
        author: authorValue,
        genres: genreValue,
        ratings: ratingValue,
        progress: progressValue,
        isbn: isbnValue,
        review: reviewValue
    }
    
    // request setup
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // updating table on books page
    xhttp.onreadystatechange = () => {
        
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            addRowToTable(xhttp.response);

            inputTitle.value = '';
            inputAuthor.value = '';
            inputGenres.value = '';
            inputRatings.value = '';
            inputProgress.value = '';
            inputISBN.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("data error - recheck sql data")
        }
    }

    xhttp.send(JSON.stringify(data));

})

// updating the table
addRowToTable = (data) => {
    
    let currentTable = document.getElementById("book-table");

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // new row for incoming data
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let authorCell = document.createElement("TD");
    let genresCell = document.createElement("TD");
    let ratingsCell = document.createElement("TD");
    let progressCell = document.createElement("TD");
    let isbnCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // fill table with data
    idCell.innerText = newRow.id;
    titleCell.innerText = newRow.title;
    authorCell.innerText = newRow.author;
    genresCell.innerText = newRow.genres;
    ratingsCell.innerText = newRow.ratings;
    isbnCell.innerText = newRow.isbn;
    progressCell.innerText = newRow.progress;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteBook(newRow.id);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(genresCell);
    row.appendChild(ratingsCell);
    row.appendChild(progressCell);
    row.appendChild(isbnCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}