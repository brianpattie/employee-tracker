const express       = require("express")
const bodyParser    = require("body-parser")
const db            = require("db_api.js")

// Handler Functions
function insertHandler(req, res) { //  TODO

    // Pull args from request

    insertEmployee(testObj)
    .then(results => {
        // Respond with success code
        console.log("Resolved:")
        console.log(results)
    })
    .catch(error => {
        // Respond with failure code
        console.log("Rejected:")
        console.log(error)
    })
}

function updateHandler(req, res) { // TODO

    // Pull args from request

    insertEmployee(testObj)
    .then(results => {
        // Respond with success code
        console.log("Resolved:")
        console.log(results)
    })
    .catch(error => {
        // Respond with failure code
        console.log("Rejected:")
        console.log(error)
    })
}

function deleteHandler(req, res) { // TODO

    // Pull args from request

    insertEmployee(testObj)
    .then(results => {
        // Respond with success code
        console.log("Resolved:")
        console.log(results)
    })
    .catch(error => {
        // Respond with failure code
        console.log("Rejected:")
        console.log(error)
    })
}

function searchHandler(req, res) { // TODO

    // Pull args from request

    insertEmployee(testObj)
    .then(results => {
        // Respond with success code
        console.log("Resolved:")
        console.log(results)
    })
    .catch(error => {
        // Respond with failure code
        console.log("Rejected:")
        console.log(error)
    })
}


// ---- Server Setup Code ----
const app   = express();
const port  = 3001;

app.use(bodyParser());

app.post("/insert", insertHandler);
app.post("/update", updateHandler);
app.post("/delete", deleteHandler);

app.get("/search", searchHandler);

app.listen(port);