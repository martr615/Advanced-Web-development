var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('insert password and login to mlab', ['x']); 
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

app.use(express.static(__dirname)); // Find html, js and css-files.
app.use(require('cors')()); // Npm package to allow cross-domain operations like: get, put, post, delete etc.
app.use(bodyParser.json()); // Our server can now parse the data from the body.

// Verify the JWT token from the frontend (home.controller.js).
// Operations on the server are then allowed for the client.
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://gamecollection.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:8000',
    issuer: "https://gamecollection.eu.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck); // Every request has to pass the check above.

// Send all of the data.
app.get('/api', function (req, res){
    console.log("The server has received a get request.");

    db.games.find(function(error, gameobject){
        res.json(gameobject);
        console.log("Returned the data to the controller.")
    });
});

// Insert data to the database.
// Returnera spelet som lagts till i databasen som dbObject
app.post('/api', function(req, res){
    console.log(req.body);
    var newGame = req.body;
    // Insert the data to the database.
    db.games.insert(newGame, function(err, dbObject){
        console.log("The new item has successfully been inserted to the database.");
        // Send the data back to the controller.
        res.json(dbObject);
    });

});

// Delete an object from the database.
app.delete('/api/:id', function(req, res){
    var id = req.params.id;
    //console.log(id);

    // Remove the object from the database.
    db.games.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
        console.log("The item has been deleted from the server.");
        // Send the removed object back to the controller.
        res.json(doc);
    });
});

// Edit/update an existing object in the database.
app.put('/api/:id', function(req, res) {
    var id = req.params.id;
    //console.log(req.params.id);

    db.games.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {title: req.body.title, platform: req.body.platform, 
                        genre: req.body.genre, price: req.body.price,
                        comment: req.body.comment}},
        new: true}, function (err, doc) {
            //console.log(doc);
            console.log("The item has been modified in the database.")
            res.json(doc);
        }
    );
});


const port = 8000;

app.listen(port);
console.log("Backend server running on port " + port + ".");

