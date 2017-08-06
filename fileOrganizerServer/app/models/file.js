
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;



var fileSchema = new Schema({
 	title: String,
 	type:String,
 	size:String,
 	owner_username: String,
 	year: String,
 	visibility:String,
 	shared_with: [{
 		username: String
 	}]
},{collection:'File'});

module.exports = mongoose.model('File',fileSchema);

