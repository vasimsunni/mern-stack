const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDB("employees");

    db_connect.collection("records").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDB();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


// This section will help you create a new record
recordRoutes.route("/record").post(function (req, res) {
    let db_connect = dbo.getDB();

    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };

    db_connect.collection("records").insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});


// This section will help you update a record by id.
recordRoutes.route("/record/:id").put(function (req, res) {
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            name: req.body.name,
        position: req.body.position,
        level: req.body.level,
        },
    }

    db_connect.collection("records").updateOne(myQuery, newValues, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


// This section will help you delete a record
recordRoutes.route("/record/:id").delete((req, res) => {
    let db_connect = dbo.getDB();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err, result) {
        if (err) throw err;
        res.status(result);
    });
});


module.exports = recordRoutes;

