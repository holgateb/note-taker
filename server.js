const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const PORT = 3001;
const app = express();

//Have the 'app' use appropriate middleware to parse body data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET /notes should return the notes.html file

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//GET /api/notes should read the `db.json` file

app.get("/api/notes", (req, res) => res.json(notes));

//POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client

fs.readFile("./db/db.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // Convert string into JSON object
    const notes = JSON.parse(data);

    // Add a new review
    notes.push(newNote);

    //fs.writefile

    fs.writeFile(
      "./db/db.json",
      JSON.stringify(notes, null, 4),
      (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info("Successfully updated notes!")
    );
  }
});

//GET * should return the index.html file

app.get("*", (req, res) =>
  res.send(
    `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/notes">http://localhost:${PORT}/api/notes</a>`
  )
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
