// Express
const express = require('express');
const { spawn } = require('child_process');
const fs = require("fs");
const axios = require('axios');

const app = express();
PORT = 8080;
const path = require('path');

// Database
const db = require('./database/db-connector');

// Handlebars
const handlebars = require('express-handlebars');
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views',
    extname: 'hbs'
}));

// allows our app to handle json data and form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/*
    ROUTES
*/
// ################ MICROSERVICE ######################
app.get('/microservice', (req, res) => {
    let result = [];
    let json = fs.readFile("microservice_result.json", "utf8", (err, data) => {
        if (err) {
            console.log("file read failed: ", err);
            return
        }
        try {
            const json_data = JSON.parse(data);
            for (let i = 0; i < Object.keys(json_data).length; i++) {
                result.push(json_data[i])
            }
            return res.render('microservice_result', { data: result});
        }
        catch (err) {
            console.log("error parsing json: ", err)
        }
    });
})

app.post('/microservice', (req, response) => {
    let query = `SELECT * FROM my_books WHERE title LIKE '%${req.body["ms-title"]}%';`;
    var dataToSend;
    const python = spawn('python', ['public/script.py', query]);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });

    python.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
    });
    
    // in clsoe event, we are sure tht stream from child process is closed
    python.on('exit', (code) => {
        response.sendFile(`${__dirname}/public/result.txt`);
        return response.redirect('/microservice');
    });
})

// ################### HOME PAGE #################
app.get('/', function (req, res) {
    return res.render('home')
})

// ############### BOOKS PAGE #######################
app.get('/books', function(req, res)
{   
    let query1;

    if (req.query.author === undefined) {
        query1 = "SELECT id, title, author, genres, ratings, progress, isbn FROM my_books;";
    } else {
        query1 = `SELECT * FROM my_books WHERE author LIKE "%${req.query.author}%"`
    }
    let query2 = "SELECT * FROM book_genres;";
    let query3 = "SELECT * FROM book_ratings";
    let query4 = "SELECT * FROM book_progress;";
    
    // START QUERY 1
    db.pool.query(query1, function(err, rows, fields){
        let books = rows;
        // START QUERY 2
        db.pool.query(query2, (err, rows, fields) => {
            let genres = rows;
            let genresmap = {}
            genres.map(genres => {
                let id = parseInt(genres.id, 10);
                genresmap[id] = genres["genre"];
            })
            // START QUERY 3
            db.pool.query(query3, (err, rows, fields) => {
                let ratings = rows;
                let ratingsmap = {}
                ratings.map(ratings => {
                    let id = parseInt(ratings.id, 10);
                    ratingsmap[id] = ratings["rating"];
                })
                // START QUERY 4
                db.pool.query(query4, (err, rows, fields) => {
                    let progress = rows;
                    let progressmap = {};
                    progress.map(progress => {
                        let id = parseInt(progress.id, 10);
                        progressmap[id] = progress["progress"];
                    })
                    books = books.map(book => {
                        return Object.assign(book, {genres: genresmap[book.genres]}, {ratings: ratingsmap[book.ratings]}, {progress: progressmap[book.progress]})
                    })
                    return res.render('index', {data: books, genres: genres, ratings: ratings, progress: progress});
                })
            })
        })
    })
});
               
app.post('/books', function(req, res) 
{   
    let data = req.body;
    let rating = parseInt(data.ratings);
    // PREVENT NULL ERRORS
    if (isNaN(rating)) {
        rating = 'NULL'
    }
    let review = parseInt(data.review);
    if (isNaN(review)) {
        review = 'NULL'
    }
    let genre = parseInt(data.genres);
    if (isNaN(genre)) {
        genre = 'NULL'
    }
    let isbn = parseInt(data.isbn);
    if (isNaN(isbn)) {
        isbn = 'NULL'
    }
    let progress = parseInt(data.progress);
    if (isNaN(progress)) {
        progress = 1
    }

    // INSERT THE VALUES:
    let query1 = `INSERT INTO my_books (title, author, genres, ratings, progress, review, isbn) VALUES ('${data.title}', '${data.author}', ${genre}, ${rating}, ${progress}, ${review}, ${isbn});`;
    // QUERY 1
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            let query2 = `SELECT id, title, author, genres, ratings, progress FROM my_books;`;
            // QUERY 2   
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.status(400).json({'Error' : 'Bad Request.'});
                }
                else {
                    res.send(rows);
                } 
            }) 
        }
    })

});

app.delete('/books', function(req, res, next){
    let data = req.body;
    let bookID = parseInt(data.id);
    let selectBook = `SELECT * FROM my_books WHERE id = ?`;
    let deleteBook= `DELETE FROM my_books WHERE id = ?`;
    // QUERY 1 - BOOK EXISTS
    db.pool.query(selectBook, [bookID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.status(404).json({'Error' : 'INVALID REQUEST: Book does not exist.'});
        }
        else {
            // QUERY 2 - BOOK DELETE
            db.pool.query(deleteBook, [bookID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).json({'Error' : 'Bad Request.'});
                } else {
                    res.status(204).json();
                }
            })
        }
  })});

app.patch('/books', function(req, res, next){
  let data = req.body;
  let progress = parseInt(data.progress);
  let book = parseInt(data.selectedBook);
  let rating = parseInt(data.rating);
  let queryRatingUpdate = `UPDATE my_books SET ratings = ? WHERE my_books.id = ?`;
  let queryBookUpdate = `UPDATE my_books SET progress = ? WHERE my_books.id = ?`;
  let selectBook = `SELECT * FROM my_books WHERE id = ?`;
    // QUERY 1 - GET BOOK
    db.pool.query(selectBook, [book], function(error, rows, fields){
    if (error) {
        console.log(error);
        res.status(400).json({'Error': 'INVALID REQUEST: Bad Request'});
    }
    else {
        // QUERY 2 - UPDATE THE PROGRESS AND RATING
        db.pool.query(queryBookUpdate, [progress, book], function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.status(400).json({'Error' : 'Bad Request.'});
            } else {
                db.pool.query(queryRatingUpdate, [rating, book], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({'Error' : 'Bad Request.'});
                    }
                    else {
                        res.send(rows);
                    }
                })
            }
        })
    }
})});


// ########### open library search ###################
app.get('/search', (req, res) => {
    res.render('isbn');
})

app.post('/search', (req, res) => {
    let base_url = "https://openlibrary.org/search.json?";
    let url = base_url + "q=" + req.body['search-title'] + "&fields=title,isbn";
    let data = [];

    axios.get(url)
    .then(result => {
        for (let i = 0; i < 10; i++) {
            data.push({"isbn": result.data["docs"][0]["isbn"][i]})
        }
        res.render('isbn', {data: data})
    })
})

// ################### FAQ ########################
app.get('/faq', function(req, res) {
    return res.render('faq');
})

app.post('/faq', function (req, res) {
    let data = req.body;

    // INSERT THE VALUES:
    let query1 = `INSERT INTO surveys (name, email, phone, issue, description) VALUES ('${data['contact-name']}', '${data['contact-email']}', ${data['contact-phone']}, ${JSON.stringify(data['contact-subject'])}, ${JSON.stringify(data['contact-description'])});`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.status(500).json({'Error' : 'no update'});
        }
        else {
            res.render('faq');
        }  
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Deployed: http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});