
# Book Management API Documentation

This Book Management API is meticulously crafted to offer comprehensive CRUD (Create, Read, Update, Delete) functionalities for efficient management of books. Additionally, it integrates robust user authentication via JSON Web Tokens (JWT), ensuring stringent access control to the API endpoints. This documentation provides an exhaustive overview of the API functionalities, encompassing user authentication, error handling, database integration, and the technologies employed in its development.




## How to Run the Project Locally

1. Ensure you have Node.js installed on your machine. You can download it from here.
2. Clone or download the repository containing the game files to your local machine.
```
git clone https://github.com/Ayushkaundal27/digital_paani_backend_assignment.git
```
3. Open your terminal or command prompt and navigate to the directory where you have downloaded the  files.
4. Run the following command to install dependencies:
```
npm -install
```
5. Once the dependencies are installed, run the following command to start the server:
```
npm start
```
Feel free to explore the API and provide feedback or suggestions for improvement. Thank you for your attention!

## Documentation

### 1. User Authentication Endpoints
 1) POST /api/v1/user/signup: Register a new user and generate JWT token.
 2) POST /api/v1/user/signin: Login user and generate JWT token.
### 2. Books Endpoints
 1) GET     /api/v1/book?author="name"&publicationYear=year Retrieve a specific  or all books by Author and publication year.
 2) POST    /api/v1/book/add Create a new Book.
 3) PUT     /api/v1/book/update Update an existing Book.
 4) DELETE  /api/v1/book/Delete Delete a Book.


### 3. Technologies Used
 1) Node.js: A JavaScript runtime environment for building server-side applications.
 2) Express.js: A web application framework for Node.js used to build RESTful APIs.
 3) MongoDB: A NoSQL database used for storing Books and user data.
 4) Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js used for database integration.
 5) JSON Web Tokens (JWT): Used for user authentication and generating secure tokens.
 6) bcrypt: A library for securely hashing passwords before storing them in the database.
 7) zod:  A library for input validation
### 4. Schema    
#### 1. User Schema
Each user object has the following properties:
 1) Email
 2) Password
#### 1. Book Schema
 Each Book object has the following properties:
 1) Title
 2) Author 
 3) PublicationYear


  
