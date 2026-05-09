const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
    session({
        secret: "iotsecret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.static("public"));

const usersFile = "./database/users.json";
const dataFile = "./database/data.json";
const lcdFile = "./database/lcd.txt";

function getIndianTime() {
    const now = new Date();

    const date = now.toLocaleDateString("en-GB", {
        timeZone: "Asia/Kolkata",
    });

    const time = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
    });

    return { date, time };
}






// REGISTER
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    let users = JSON.parse(fs.readFileSync(usersFile));

    users.push({
        name,
        email,
        password,
    });

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.redirect("/");
});




// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    let users = JSON.parse(fs.readFileSync(usersFile));

    let user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        req.session.user = user;
        res.redirect("/dashboard.html");
    } else {
        res.send("Invalid Login");
    }
});




// GET USER
app.get("/get-user", (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.json({});
    }
});






// API 1 SAVE SENSOR DATA
app.get("/save-data", (req, res) => {
    const temp = req.query.temperature;
    const hum = req.query.humidity;

    let records = JSON.parse(fs.readFileSync(dataFile));

    const indianTime = getIndianTime();

    records.push({
        temperature: temp,
        humidity: hum,
        time: indianTime.time,
        date: indianTime.date,
    });

    fs.writeFileSync(dataFile, JSON.stringify(records, null, 2));

    res.send("DATA SAVED");
});






// GET LATEST DATA
app.get("/latest-data", (req, res) => {
    let records = JSON.parse(fs.readFileSync(dataFile));

    if (records.length > 0) {
        res.json(records[records.length - 1]);
    } else {
        res.json({});
    }
});






// GET ALL DATA
app.get("/all-data", (req, res) => {
    let records = JSON.parse(fs.readFileSync(dataFile));
    res.json(records);
});






// DELETE DATA
app.get("/delete/:id", (req, res) => {
    let records = JSON.parse(fs.readFileSync(dataFile));

    records.splice(req.params.id, 1);

    fs.writeFileSync(dataFile, JSON.stringify(records, null, 2));

    res.redirect("/dashboard.html");
});







// SAVE LCD TEXT
app.post("/save-lcd", (req, res) => {
    const text = req.body.text;

    fs.writeFileSync(lcdFile, text);

    res.send("LCD TEXT SAVED");
});






// API 2 FETCH LCD TEXT
app.get("/get-lcd", (req, res) => {
    const text = fs.readFileSync(lcdFile, "utf8");

    res.send(text);
});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Running...");
});