const mongoose = require('mongoose');
const mongoose_variable = require('mongoose'); 
const {Schema} = mongoose; 

const create_user_schema = new Schema({
    username: {
        type: String, 
        required: true,  
        unique: true 
    }, 
    email:{ 
        type: String, 
        required: true, 
        unique: true 
    },
    password:{
        type: String, 
        required: true, 
        unique: true 
    },
    date:{
        type: Date, 
        default: Date.now
    }
}); 

const user = mongoose_variable.model('user', create_user_schema); 
user.createIndexes(); 
module.exports = user; 