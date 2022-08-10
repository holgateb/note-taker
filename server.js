const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')

const PORT = 3001;
const app = express();

//GET /notes should return the notes.html file

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//GET * should return the index.html file

app.get('*', (req, res) =>
  res.send(
    `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
  )
);

//GET /api/notes should read the `db.json` file

app.get('/api/notes', (req, res) => res.json(notes));

//POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client


    //fs.writefile

fs.writeFile(
    './db/notes.json',
    JSON.stringify(parsedReviews, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);