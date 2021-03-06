let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    "number": String,
    "author": String,
    "title": String,
    "publisher": String,
    "numberRater": String,
    "average": String,
    "summary": String,
    "price": String,
    "tags": Array,
    "img": String
})
module.exports = mongoose.model('books', bookSchema);