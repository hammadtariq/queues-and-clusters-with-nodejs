var mongoose = require('./../config/db');
var Schema   = mongoose.Schema;

var WorkSchema = new Schema({
    name: String,
    workname: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Work', WorkSchema);
