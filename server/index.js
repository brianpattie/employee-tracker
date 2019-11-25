const express       = require("express")
const bodyParser    = require("body-parser")
const cors          = require("cors") // TODO Remove this once you have it working on the same origin.
const db            = require("./db_api.js")

// ---- Request Handler Functions ----
function insertHandler(req, res) { db.insert(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        console.log(error)
        res.status(500)
        res.send("There was an error processing your request")
    })
}

function updateHandler(req, res) {
    db.update(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        console.log(error)
        res.status(500)
        res.send("There was an error processing your request")
    })
}

function deleteHandler(req, res) {
    db.delete(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        console.log(error)
        res.status(500)
        res.send("There was an error processing your request")
    })
}

function searchHandler(req, res) {
    db.search(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        res.status(500)
        res.send("There was an error processing your request")
    })
}


// ---- Server Setup Code ----
const app   = express();
const port  = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.post("/insert", insertHandler);
app.post("/update", updateHandler);
app.post("/delete", deleteHandler);
app.post("/search", searchHandler);

app.listen(port, () => { console.log(`Listening on port ${port}`)});