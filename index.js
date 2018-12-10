//Install express server
require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/InfomontCAI"));
app.use(express.static(__dirname + "/main.html"));

app.get("/", function(req, res) {
    res.redirect('/base');
});

app.get("/base", function(req, res) {
    res.sendFile(path.join(__dirname + "/main.html"));
});

app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname + "/dist/InfomontCAI/index.html"))
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT);
