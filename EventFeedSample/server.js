/**
 * Created by rbailey on 24/10/2014.
 */
var express = require('express');
var app = express();

require('./models/Contracts');     // Mongoose model, we dont need the return, this script just registers the model with mongoose...
var jobsData = require('./contracts-data');

// This adds the api route to express, passing in our Data Access layer (jobsData) express app (app)
// No need to capture the return value as it just inerts routes in the express app.
require('./contracts-service')(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
    res.render('index');
});

jobsData.connectDb(process.env.MongoDbConnection)
    .then(function(){
        console.log('Connected to MongoDB ok');
        jobsData.seedContracts();
    });


app.listen(process.env.PORT || 3001);