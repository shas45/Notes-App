const mongoose = require("mongoose")
const note = require("./note.js");


main().then(console.log("Database connection successful"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/notesdb");
    console.log("Connected to MongoDB");
}



let notes = [
    {
        title: "Express Note",
        content: "Today I learned about Express.js and how to set up a basic server.",
        created_at: new Date()
    },
    {
        title: "MongoDB Note",
        content: "Today I learned about MongoDB and how to connect it with Mongoose.",
        created_at: new Date()
    },
    {
        title: "Node js",
        content: "Today i learned about node.js and how to use it."
    }
]

// note.create(notes);