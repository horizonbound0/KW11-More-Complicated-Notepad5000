// Import express
const express = require('express');

// Import db/db.json
const notes_db = require('./db.json');

// Import path
const path = require('path');

// Making app function def
const app = express();

// Temporary port variable
const PORT = 3001;

// Telling app I have a public folder for static assets
app.use(express.static('public'));

// Express routes

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(notes_db);
});

app.post('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
});

app.delete('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
