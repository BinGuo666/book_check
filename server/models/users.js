let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "openId":String,
    "userName":String,
    "userImg":String,
    "userProvince":String,
    "userBooks":[
        {
            "number":String,
            "author":String,
            "title":String,
            "publisher":String,
            "numberRater":String,
            "average":String,
            "summary":String,
            "price":String,
            "tags":Array,
            "img":String
        }
    ]
})
module.exports = mongoose.model('users',userSchema);