const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs");

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// Maintenance middleware
//app.use((req, res, next) => {
//    res.render("maintenance");
//});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

//app.use(function (req, res, next) {
//    res.locals.currentYear = new Date().getFullYear();
//    next();
//});

app.get("/", (req, res) => {
    res.render("home", {
        pageTitle: "Home page",
        message: "Welcome to <strong>Cyrus Villacampa</strong>'s home page"
    });
});


app.get("/about", (req, res) => {
    res.render("about", {
        pageTitle: "About page",
        message: "This is <strong>Cyrus Villacampa</strong>'s about page."
    });
});

app.get("/projects", (req, res) => {
    res.render("projects", {
        pageTitle: "Portfolio page",
        message: "Welcome to the portfolio page of <strong>Cyrus Villacampa</strong>"
    })
});

app.get("/bad", (req, res) => {
    var obj_err = {
        errorMessage: "Bad request",
        errorCode: 404
    };
    
    res.json(obj_err);
});



app.listen(port, () => {
    console.log(`The server.js has started and listening on port ${port}`)
})