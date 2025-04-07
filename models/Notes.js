const mongoose_variable_notes = require('mongoose');
const mongoose = require('mongoose'); 
const {Schema} = mongoose;  

const notes_schema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'  
    },
    title:{
        type: String, 
        required: true  
    }, 
    description: {
        type: String, 
        required: true 
    }, 
    date:{
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose_variable_notes.model('notes', notes_schema);