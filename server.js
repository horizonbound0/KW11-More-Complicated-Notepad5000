// Import express
const express = require('express');

// Import js
const fs = require('fs');

// Import db/db.json
let notes_db = require('./db/db.json');

// Import path
const path = require('path');

// Making app function def
const app = express();

// Port variable for Render
const PORT = process.env.PORT || 3001;

// req res helper function
// const reqRes = (req, res) => {
  
//   res.json(`${req.method} request received`);
//   console.info(req.body);
//   console.info(`${req.method} request received`);
// }

// Telling app I have a public folder for static assets
app.use(express.static('public'));
// Parsing request objects as they come in
app.use(express.json());
// Same as above, but for URL encoded ones
app.use(express.urlencoded({ extended: true }));

// Express routes

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(notes_db);
});

app.post('/api/notes', (req, res) => {
  // Reassure myself that the request was successfully received lol
  console.info(`${req.method} was received`);

  // grab notes DB
  let currentDB = notes_db;

  // Add a unique ID to the note object we just received
  req.body.id = crypto.randomUUID();

  // Shove it into our variable array
  currentDB.push(req.body);

  // Show myself that it's been added correctly.
  console.log(currentDB);

  // Reset notes_db
  notes_db = currentDB;

  // Show what's in notes_db now
  console.log(notes_db);

  // Overwrite the notes db
  fs.writeFile('./db/db.json', JSON.stringify(notes_db), (err) => 
  err ? console.error(err) : console.log('Success!'));
});

app.delete('/api/notes/:id', (req, res) => {

  console.log(`db.json = ${JSON.stringify(notes_db)}`);

  console.info(req.body);

  console.info(`${req.method} was received`);

});

app.get('/*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html')));

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
