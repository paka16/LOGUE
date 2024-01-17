import axios from 'axios';
let msData = document.getElementById('ms-form');

msData.addEventListener("submit", function (e) {
    console.log("searching for book!")
    e.preventDefault();

    let title = document.getElementById("ms-title");
    let titleValue = title.value;
    let data = {
        intitle: titleValue
    }

    axios.post('/microservice', {
        data: JSON.stringify(data)
    });
})