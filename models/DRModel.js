var mongoose = require('./../config/db');
var Schema   = mongoose.Schema;

var DRSchema = new Schema({
    name: String,
    provider: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('DR', DRSchema);
