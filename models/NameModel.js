var mongoose = require('./../config/db');
var Schema   = mongoose.Schema;

var NameSchema = new Schema({
    name: String,
    recordname: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Name', NameSchema);
