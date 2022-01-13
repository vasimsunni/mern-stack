const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        //Connect to database client
        client.connect(function (err, db) {
            // Verify we got a db object
            if (db) {
                _db = db.db("MongoDBCluster");
                console.log("Successfully connection to MongoDB Server");
            }
            return callback(err);
        });
    },
    getDB: function () {
        return _db;
    }
};