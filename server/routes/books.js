var express = require('express');
var router = express.Router();
var Books = require('./../models/books');

// mongoose.connect('mongodb://127.0.0.1/MWX');

// mongoose.connection.on("connected",function(){
//   console.log("MongoDB connected success!");
// });

// mongoose.connection.on("err",function(){
//   console.log("MongoDB connected fail!");
// });

// mongoose.connection.on("disconnected",function(){
//   console.log("MongoDB connected disconnected!");
// })

// 获取数据库图书信息
router.get("/", function (req, res, next) {
    Books.find({}, function (err, docs) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: "服务器出错"
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:docs
            })
        }
    })
})
//查询图书基本信息
router.get('/check',function(req,res,next){
    let number = req.param('number');
    Books.findOne({number:number},function(err,doc){
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:"服务器出错",
            })
        }else{
            res.json({
                status:'0',
                msg:"查询数据成功",
                result:doc
            })
        }
    })
})

module.exports = router;