<template>
  <div>
    <div id="book_bg">
      <img class="back" :src="booknew.img" alt="">
      <img class="book" :src="booknew.img" alt="">
      <div class="title">
        {{booknew.title}}
      </div>
    </div>
    <div id="news_box1">
      <div class="author">
        作者：{{booknew.author}}
      </div>
      <div class="average">
        评分： {{booknew.average}}
      </div>
      <div class="publisher">
        出版社：{{booknew.publisher}}
      </div>
      <div class="price">
        {{booknew.price}}
      </div>
    </div>
    <div id="news_box2">
      <div class="news_tip">
        <ul>
          <li class="tip_text" v-for="(item,index) in booknew.tags" :key="index">
            {{item.name}} {{item.count}}
          </li>
        </ul>
      </div>
      <div class="news_text">
        {{booknew.summary}}
      </div>
      <!-- <div id="comment_box">
        <ul>
          <li class="comment" v-for="(item,index) in comments" :key=index>
            {{item.author.name}}
          </li>
        </ul>
      </div> -->
    </div>
    <div id="comment_btn" @click.stop="comment()">
        <button>
          查看评论
        </button>
      </div>
  </div>
</template>

<script>
// wx.showShareMenu({
//   withShareTicket: true
// })
export default {
  data(){
    return{
      booknew:{},
      comments:[]
    }
  },
  mounted(){
    this.getbook();
  },
  onShareAppMessage: function(options) {
    console.log('分享图书！')
    return{
    }
	},
  methods:{
    getbook(){
      let thiss = this;
      var pages = getCurrentPages();
      var number = pages[1].options.number;
      var size = pages[1].options.size;
      // if(size=='1'){
      //   console.log("触发了第一个")
      // }
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
              publisher: res.data.publisher,
              numberRater: res.data.rating.numRaters,
              average: res.data.rating.average,
              summary: res.data.summary,
              price: res.data.price,
              tags: res.data.tags,
              img: res.data.images.small
            };

          thiss.booknew = booknews;
          // thiss.booknew.tags = JSON.parse(res.data.result.tags);
        }
      });

    },
    comment(){
      var number=9787506365437;
      console.log("跳转到图片评论页面")
        wx.navigateTo({
            url:'/pages/comment/main?number='+number
        })
    }
  }

}
</script>

<style>
/* 图书图片样式 */
#book_bg{
  width: 100%;
  height: 230px;
  position: relative;
}
#book_bg .back{
  width: 100%;
  height: 100%;
  filter:blur(13px);
}
#book_bg .book{
  width: 120px;
  height: 160px;
  position: absolute;
  left: calc(50% - 60px);
  top: 20px;
}
#book_bg .title{
  color: aliceblue;
  z-index: 5;
  font-size: 16px;
  height: 20px;
  position: absolute;
  text-align: center;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  font-weight: 700;
}
/* 图书基本信息 */
#news_box1{
  width: 100%;
  height: 50px;
  position: relative;
  /* background-color: #523; */
  font-size: 13px;
  color: black;
  margin-top: 10px;
  
}
#news_box1 .author{
  position: absolute;
  left: 0px;
  top: 0px;
  line-height: 25px;
  margin-left: 10px;
  width: 250px;
  height: 25px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
#news_box1 .average{
  position: absolute;
  right: 0px;
  top: 0px;
  line-height: 25px;
  margin-right: 10px;
  color: rgb(54, 114, 243);
  font-size: 14px;
  font-weight: 700;
}
#news_box1 .publisher{
  position: absolute;
  left: 0px;
  bottom: 0px;
  line-height: 25px;
  margin-left: 10px;
}
#news_box1 .price{
  position: absolute;
  right: 0px;
  bottom: 0px;
  line-height: 25px;
   margin-right: 10px;
   color: rgb(228, 23, 23);
   font-weight: 700;
}
/* 图书标题和简介 */
#news_box2{
  padding-left: 10px;
  padding-right: 10px;
}
#news_box2 .tip_text{
  font-size: 13px;
  color: #EA5A49;
  border-radius: 10px;
  border:1px solid #EA5A49;
  display:inline-block;
  padding:3px;
  margin: 3px 5px;
}
#news_box2 .news_text{
  font-size: 15px;
  text-indent: 2em; 
  margin-top: 5px;
  padding-bottom: 70px;
  z-index: 10;
}
#comment_btn{
  position: fixed;
  bottom: 0;
  width: 100%;
}
#comment_btn button{
  color: #fff;
  background: #EA5A49;
  letter-spacing: 3px;
}
</style>
