const express = require("express");
const path = require("path");
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;
const app = express();

//Have the 'app' use appropriate middleware to parse body data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//GET /notes should return the notes.html file

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//GET /api/notes should read the `db.json` file

app.get("/api/notes", (req, res)=>{
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client

app.post("/api/notes", (req, res)=>{
  console.log(req.body);

  if (req.body) {

    const newNote = {
      title: req.body.title, 
      text:req.body.text
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

//GET * should return the index.html file

app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
