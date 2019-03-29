var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/users');
let session = require('express-session');
let request = require('request');

router.use(session({
  secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
      maxAge:1000*30*60    /*过期时间*/

  },   /*secure https这样的情况才可以访问cookie*/

  //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期

  rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）


}))

mongoose.connect('mongodb://127.0.0.1/MWX');

mongoose.connection.on("connected",function(){
  console.log("MongoDB connected success!");
});

mongoose.connection.on("err",function(){
  console.log("MongoDB connected fail!");
});

mongoose.connection.on("disconnected",function(){
  console.log("MongoDB connected disconnected!");
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("访问成功")
});
//用户登录接口
router.post('/login', function(req, res, next) {
  let openId = req.body.openId;
  let userName = req.body.userName;
  let userImg = req.body.userImg;
  let userProvince = req.body.userProvince;

  User.findOne({openId:openId},function(err,doc){
    if(err){
      res.json({
        status:"0",
        msg:err.message,
        result:"服务器出错"
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:"",
          result:doc
        })
      }else{
        let users = new User({
          "openId":openId,
          "userName":userName,
          "userImg":userImg,
          "userProvince":userProvince
        });
        users.save(function(err1,doc){
          if(err1){
            res.json({
              status:"2",
              msg:err1.message,
              result:"数据库保存出错"
            })
          }else{
            res.json({
              status:'0',
              msg:"",
              result:'登陆成功,'
            })
          }
        })
      }
    }
  })
});
//用户添加图书
router.post('/addbook',function(req,res,next){
  let openId = req.body.openId;
  let number = req.body.number;
  let author = req.body.author;
  let title = req.body.title;
  let publisher = req.body.publisher;
  let numberRater = req.body.numberRater;
  let average = req.body.average;
  let summary = req.body.summary;
  let price = req.body.price;
  let tags = req.body.tags;
  let img = req.body.img;
  console.log(tags);
  User.findOne({openId:openId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:'服务器出错'
      })
    }else{
      let booksItem = "";
      doc.userBooks.forEach(function(item){
        if(item.number === number){
          booksItem = item;
        }
      })
      if(booksItem){
        res.json({
          status:'303',
          msg:'',
          result:'该图书已存在'
        })
      }else{
        let booksNew = {
          number:number,
          author:author,
          title:title,
          publisher:publisher,
          numberRater:numberRater,
          average:average,
          summary:summary,
          price:price,
          tags:tags,
          img:img
        }
        // for(let i=0;i<tags.length;i++){

        // }
        doc.userBooks.push(booksNew);
        doc.save(function (err2,doc2) {
          if(err2){
            res.json({
              status:"1",
              msg:err2.message,
              result:"服务器出错"
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'添加图书成功'
            })
          }
        })
      }
    }
  })
})
//获取用户图书信息
router.post('/check',function(req,res,next){
  let openId = req.body.openId;

  User.findOne({openId:openId},function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:"服务器出错"
      })
    }else{
      if(!doc.userBooks){
        res.json({
          status:"102",
          msg:"",
          result:"图书信息为空"
        })
      }
      else{
        res.json({
        status:"0",
        msg:"获取用户图书信息成功",
        result:doc.userBooks
      })
      }
    }
  })
})
//查询图书
router.get('checknews',function(req,res,next){
  let number = req.param('number');
  let openId = req.param('openId');
  User.findOne({openId:openId},function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:"服务器出错"
      })
    }else{
      if(err){
        res.json({
          status:"1",
          msg:err.message,
          result:"服务器出错"
        })
      }else{
        doc.userBooks.findOne({number:number},function(err,doc){
          if(err){
            res.json({
              status:"1",
              msg:err.message,
              result:"服务器出错"
            })
          }else{
            res.json({
              status:'0',
                msg:"查询数据成功",
                result:doc
            })
          }
        })
      }
    }
  })
})
module.exports = router;
