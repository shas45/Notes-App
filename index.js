const express = require('express');
const app = express();
const path = require("path")
const Note = require("./models/note.js");
const connect_db = require("./models/init.js");
const wrapAsync = require("./Error/wrapAsync.js")
const ExpressError = require("./Error/ExpressError.js")
const ejsMate = require("ejs-mate")
// const { log } = require('console');

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.engine('ejs', ejsMate);


app.get("/notes" ,wrapAsync(
    async(req, res) => {
    let allNotes = await Note.find();
    res.render("index.ejs", {allNotes});
    // console.log(allNotes);
    // res.send("Hello, World!");
}))

// new route
app.get("/notes/new", (req, res) => {
    res.render("new.ejs")
})

// create route
app.post("/notes", wrapAsync(
    async(req, res) =>{
    let {title, content} = req.body;
    let new_note = new Note({
        title: title,
        content: content
    })
    // console.log(new_note)
    await new_note.save();
    res.redirect("/notes")
}))

// edit route
app.get("/notes/:id/edit", wrapAsync(
    async(req, res) => {

    let { id } = req.params;
    let note = await Note.findById(id);
    res.render("edit.ejs", {note})
    // console.log(note)
}))

//  update route

app.post("/notes/:id/update", wrapAsync( 
    async (req, res) => {
    let {id} = req.params;
    let {title, content} = req.body;
    await Note.findByIdAndUpdate(id, {title: title, content: content});
    res.redirect("/notes")
    // console.log("updated")
}))

app.post("/notes/:id/delete", wrapAsync(
    async(req, res) => {
    let {id} = req.params;
    await Note.findByIdAndDelete(id);
    res.redirect("/notes");
}))



app.get("/", (req, res) =>{
    res.send("Hello, World!");
})


app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) =>{
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).send(message);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});