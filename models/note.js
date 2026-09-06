const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
   title: {
        type:String,
        required: true,
   },
    content: {
        type:String,
        required:true,
    },

    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

let Note =  mongoose.model("Note", noteSchema);
module.exports = Note;