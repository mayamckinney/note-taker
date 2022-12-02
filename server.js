const fs = require('fs');
const express = require('express');
const path = require('path');
const util = require('util');
const uniqid = require('uniqid');
const noteDb = require('./db/db.json')

// start express app
const app = express();
const PORT = process.env.PORT || 3001;

// parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(noteDb);
});

app.post('/api/notes', (req, res) => {
    var newNote = req.body;
    newNote.id = uniqid();
    noteData.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 4) , (err) => {
        err ? console.log(err) : res.send(newNote);
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.unlink(id, './db/db.json');
    res.readFile(id, './db/db.json');
});

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// listening to confirm to user
app.listen(PORT, function() { 
    console.log("Great! Server is lisening on PORT: " + PORT);
});