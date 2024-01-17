import axios from 'axios';

let bookSearch = document.getElementById('contact-form');
bookSearch.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("contact-name");
    let email = document.getElementById("contact-email");
    let phone = document.getElementById("contact-phone");
    let issue = document.getElementById("contact-subject");
    let description = document.getElementById("contact-description");

    let nameValue = name.value;
    let emailValue = email.value;
    let phoneValue = phone.value;
    let issueValue = null;
    let descriptionValue = null;
    
    if (issue !== null) {
        issueValue = issue.value
    }
    if (description !== null) {
        descriptionValue = description.value;
    }
   
    

    let data = {
        inname: nameValue,
        inemail: emailValue,
        inphone: phoneValue,
        inissue: issueValue,
        indescription: descriptionValue
    }

    axios.post('http://localhost:8080/faq', {
        data: JSON.stringify(data)
    })
        
})


