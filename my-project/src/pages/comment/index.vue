<template>
  <div class="counter-warp">
    <div id="title_box">
      <div class="img">
        <img :src="book.img" alt="">
      </div>
      <div class="title">
        {{book.title}}
      </div>
      <div class="author">
        {{book.author}}
      </div>
    </div>
    <div class="tip">
      精彩评论
    </div>
    <div id="comment_box">
      <ul>
        <li class="comment" v-for="(item,index) in comments" :key="index">
             <div class="comment_author">
               <img :src="item.author.avatar" alt="">
               <div>{{item.author.name}}</div>
             </div>
             <div class="comment_good">
               <div>{{item.votes}}</div>
               <img src="../../../static/img/good_icon.png" alt="">
             </div>
             <div class="comment_text">
               {{item.summary}}
             </div>
             <div class="comment_time">
               {{item.published}}
             </div>
        </li>
       
      </ul>
    </div>
  </div>
</template>

<script>
// Use Vuex

export default {
  data(){
    return{
      book:{},
      comments:[]
    }
  },
  mounted(){
    this.getbooks();
    this.getcomment();
  },
  methods: {
    getbooks(){
      let thiss = this;
      var pages = getCurrentPages();
      var number = pages[1].options.number;
      //调用详情接口
      wx.request({
         url: `http://localhost/db/isbn/:${number}`,
        data: {
        },
        method: "GET",
        header: {
          "content-type": "application/xml"
        },
        success(res) {
           let booknews = {
              number: number,
              author: res.data.author,
              title: res.data.title,
              img: res.data.images.small
            };

          thiss.book = booknews;
          // thiss.booknew.tags = JSON.parse(res.data.result.tags);
        }
      });
    },
    getcomment(){
      let thiss = this;
      var pages = getCurrentPages();
      var number = pages[1].options.number;
      //调用评论接口
      wx.request({
        url: `http://localhost/db/isbn/${number}/comments?count=13`,
        data: {
        },
        method: "GET",
        header: {
          "content-type": "application/xml"
        },
        success(res){
          console.log(res.data.comments);
          thiss.comments = res.data.comments;
        }
      })
    }
  }
}
</script>

<style>
/* 头部图书信息 */
#title_box{
  width: 100%;
  height: 110px;
  position: relative;
  border-bottom: 10px solid rgba(207, 207, 207, 0.664);
}
#title_box .img{
  width: 65px;
  height: 90px;
  position: relative;
  margin-left: 15px;
  margin-right: 12px;
  top: 10px;
  float: left;
}
#title_box .img img{
  width: 100%;
  height: 100%;
}
#title_box .title{
  position: relative;
  font-size: 20px;
  font-weight: 600;
  top: 25px;
  letter-spacing: 1px;
}
#title_box .author{
  position: relative;
  font-size: 16px;
   top: 30px;
  letter-spacing: 1px;
  color: #999;
}
/* 用户评价模块 */
.tip{
  width: 100%;
  position: relative;
  height: 30px;
  line-height: 30px;
  font-size: 17px;
  color: #999;
  margin-left: 15px;
}
#comment_box{
  position: relative;
  width: 100%;
}
#comment_box ul{
  width: 100%;
}
#comment_box li{
  width: 100%;
  height: 130px;
  position: relative;
  /* background-color: rgba(189, 64, 64, 0.445); */
  border-bottom:1px solid rgba(207, 207, 207, 0.664);
  padding: 15px 0;
}
.comment_author{
  position:absolute;
  width: 60%;
  height: 40px;
  background-color: #fff;
  left: 15px;
}
.comment_author img{
  width: 34px;
  height: 34px;
  border-radius: 34px;
  float: left;
}
.comment_author div{
  line-height: 35px;
  font-size: 17px;
  color: rgb(14, 73, 202);
  margin-left: 45px;
  /* background: rgba(0, 0, 0, 0.384); */
}
.comment_good{
  width: 30%;
  height: 40px;
  position:absolute;
  right: 15px;
  top: 15px;
}
.comment_good img{
  width: 30px;
  height: 30px;
  display:block;
  float:right;
  position: relative;
  top: 5px;
}
.comment_good div{
  float:right;
  line-height: 40px;
  font-size: 15px;
}
.comment_text{
  position: absolute;
  width: calc(100% - 75px);
  height: 60px;
  left: 60px;
  background-color: #fff;
  top: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 15px;
  color: #000;
}
.comment_time{
  position: absolute;
  left: 60px;
  bottom: 15px;
  font-size: 15px;
  color: #999;
}

</style>
