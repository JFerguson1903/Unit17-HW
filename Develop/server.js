const express = require("express");
const logger = require("morgan");
const path = require('path');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const app = express();
const router = require("express").Router();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, 'public', 'exercise.html')));

app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, 'public', 'stats.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
