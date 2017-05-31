var credentials = require("../config/credentials");
var mongoose = require('mongoose');

var options = { server: { 
	socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } 
	} 
};
mongoose.connect(credentials.connectionString, options);
var conn = mongoose.connection;
conn.on('error',console.error.bind(console, 'connection error:'));

//create schema
var recordSchema = mongoose.Schema({
	artist: String,
	title: String,
	genre: String

});
module.exports = mongoose.model('records', recordSchema); //change to lower case collection in Mlab and here