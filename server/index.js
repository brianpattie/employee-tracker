const express       = require("express")
const bodyParser    = require("body-parser")
const db            = require("./db_api.js")

// ---- Request Handler Functions ----
function insertHandler(req, res) { //  TODO

    db.insert(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        res.status(500)
        res.send("There was an error processing your request")
    })
}

function updateHandler(req, res) { // TODO

    db.update(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        res.status(500)
        res.send("There was an error processing your request")
    })
}

function deleteHandler(req, res) { // TODO

    db.delete(req.body)
    .then(results => {
        res.status(200)
        res.json(results)
    })
    .catch(error => {
        res.status(500)
        res.send("There was an error processing your request")
    })
}

function searchHandler(req, res) { // TODO
    console.log('/search request received')
    console.log(req.body)

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

app.post("/insert", insertHandler);
app.post("/update", updateHandler);
app.post("/delete", deleteHandler);
app.post("/search", searchHandler);

app.listen(port, () => { console.log(`Listening on port ${port}`)});