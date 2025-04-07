const mongoose_variable = require('mongoose'); 
// const mongoose_url = 'mongodb://localhost:27017';
const mongoose_url = 'mongodb://localhost:27017/Notebook';
             
const connect_to_mongo = async () => {
    try{
        await mongoose_variable.connect(mongoose_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongoose Database Successfully....."); 
    }
    catch (error){
        console.log("Connection to Mongoose Database Unsuccessfull.....", error); 
    }
}

module.exports = connect_to_mongo; 