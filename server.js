// Import express
const express = require('express');

// Import js
const fs = require('fs');

// Import db/db.json
const notes_db = require('./db/db.json');

// Import path
const path = require('path');

// Making app function def
const app = express();

// Port variable for Render
const PORT = process.env.PORT || 3001;

// req res helper function
const reqRes = (req, res) => {
  
  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
}

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

app.post('/api/notes', reqRes);

app.delete('/api/notes/:id', reqRes);

app.get('/*', (req, res) => 
  res.send(`Try another URL, this one is broke... UUID: ${crypto.randomUUID()}`));

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
