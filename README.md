# LOGUE
A portfolio project with two parts: the main project and a microservice. 
## ABOUT
* The main project was made to be a personal book cataloging program.
  * This project has three main pages: a home page, a books page, and an faq to answer possible questions a user may potentially have.
  * This project was designed and created in sprints - sprint breakdown will be below.
  * This project also implements a microservice using python's socket module along with sys module to incorporate it with the main project's javascript.
   * The host.py file is adapted from my partner's code to fit the main project.  
    
* The microservice is made to receive a ticker and returns information about it.
  * Use of API and yfinance module.
 
## TECHNOLOGIES
MAIN PROJECT:
* Node.js - express
* MySQL, SQLAlchemy
* Python
* HTML - handlebars
* CSS

MICROSERVICE:
* Python
* Stock API (https://www.alphavantage.co/), YFinance Module, Socket Module
* https://github.com/paka16/361-microservice 
  
## HOW-TO
1. in the ```database``` folder, add the necessary credentials for the ```user``` and ```password``` in the ```db-connector.js``` file. The ```databse``` portion is already filled with the name 'library' but feel free to change it to the database you are using.
2. Run the two sql files in the terminal. 
3. Run command to get the project started locally:
```
npm start
```
* This will take use to the homepage:
![Alt_text](https://github.com/paka16/LOGUE/blob/main/portfolio_github/homepage.PNG)

3. The home page has three main navigation tabs: Home/Logue, Books, and FAQ along with a button to toggle Light/Dark mode for the user's preference.
 * Dark Mode:
 ![Alt_text](https://github.com/paka16/LOGUE/blob/main/portfolio_github/darkmode.PNG)

4. Books Page:
* The user can check their logged books along with four other functions: Add New Book, Update Book Progress, Search Personal Library (microservice), and Search Using OpenLibrary.
![Alt_text](https://github.com/paka16/LOGUE/blob/main/portfolio_github/book1.PNG)
![Alt_text](https://github.com/paka16/LOGUE/blob/main/portfolio_github/book2.PNG)
* THe book logging is down in MySQL - (library.sql file) 

5. FAQ:
* The faq page consists of directions for the user's convenince. There is also a survey/'contact us' portion in case the the user needs to ask a more personal question.
![Alt_text](https://github.com/paka16/LOGUE/blob/main/portfolio_github/faq1.PNG)
![Alt_text](https://github.com/paka16/LOGUE/blob/main/portfolio_github/faq2.PNG)
* The survey is inserted into a survey database (survey.sql file).


