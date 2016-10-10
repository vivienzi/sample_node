var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

// connecting to mongodb
mongoose.connect('mongodb://localhost/mean_database');
//schema
var user_schema = new mongoose.Schema({
	"name":String,
	"email":String,
	"location":String,
	"phone":Number,
	"age":Number,
	"active":Boolean
});

//model
var user_model = mongoose.model('users', user_schema);

var app = express();

app.use(express.static('assets'));//allow pass assets folder to frontend
app.use(bodyparser.json());//return json file by default

app.get('/', function(req, res) {
	res.sendFile(__dirname+'/express.html');
});  //__dirname =root folder


app.get('/list_users', function(req, res) {
	user_model.find(function(err, user_list_response) {
		res.send(user_list_response);
	});
}); //find user_model collection里的all document, result is user_list_response .json  find里返回array 

app.post('/save_user', function(req, res) {
	
	//document
	var user_document = new user_model({
		"name":req.body.name,
		"email":req.body.email,
		"location":req.body.location,
		"phone":req.body.phone,
		"age":req.body.age,
		"active":true
	});
	user_document.save(function(err, response) {
		if(err) {
			res.send({flag:'error', user:response});;
		} else {
			res.send({flag:'success', user:response});
		}
	});
});

app.del('/delete_user/:_id', function(req, res) {
	user_model.remove({_id:req.params._id}, function(err, user_list_response) {
		if(err) {
			console.log('Error while deleting user data');
		} else {
			res.send('success');
		}
	});
});




app.listen(8085, function() {
	console.log('App listening to localhost !');
});