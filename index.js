const connect_to_mongo = require('./db'); 
const express_variable = require('express');
const cors = require("cors"); 

connect_to_mongo();
                                                          
const app = express_variable(); 
const port = process.env.port || 5000;

// middleware to parse json body......
app.use(express_variable.json());

// Allow requests from http://localhost:3000, CORS(Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to a different domain than the one that served the web page.
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"]//only these headers are allowed to be sent in the request....
}));

app.options("/api/authentication/signout", cors()); // Handle preflight requests

// adding routes.......
app.use('/api/authentication', require('./routes/authentication'));
app.use('/api/notes_route', require('./routes/notes_route'));

// api requests...............
app.get('/', (req, res)=>{
    res.send("Hello World"); 
});

app.listen(port, ()=>{
    console.log(`Server is Running at PORT; http://localhost:${port}`); 
});