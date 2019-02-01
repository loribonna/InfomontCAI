//Install express server
const express = require("express");
const path = require("path");
const app = express();

if (process.env.DEBUG) {
    app.get("/", function(req, res) {
        res.redirect("/base");
    });

    app.get("/base", function(req, res) {
        res.sendFile(path.join(__dirname + "/main.html"));
    });

    app.use(express.static(__dirname + "/dist/InfomontCAI"));

    app.get("/target", function(req, res) {
        res.sendFile(path.join(__dirname + "/dist/InfomontCAI/index.html"));
    });

    app.get("/:id", function(req, res) {
        res.sendFile(path.join(__dirname + "/dist/InfomontCAI/index.html"));
    });
} else {
    // Serve only the static files form the dist directory
    app.use(express.static(__dirname + "/dist/InfomontCAI"));

    app.get("/:id", function(req, res) {
        res.sendFile(path.join(__dirname + "/dist/InfomontCAI/index.html"));
    });
}

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8090, function() {
    console.log("Listening on port " + (process.env.PORT || 8090));
});
