<template>
  <div>
    <!-- 头部轮播图 -->
    <div id="planting" @click="lunbo();">
      <div id="planting_box">
        <ul>
          <li class="planting_img">
            <img src="../../../static/img/planting1.jpg" alt>
          </li>
          <li class="planting_img">
            <img src="../../../static/img/planting2.jpg" alt>
          </li>
          <li class="planting_img">
            <img src="../../../static/img/planting3.jpg" alt>
          </li>
          <li class="planting_img">
            <img src="../../../static/img/planting1.jpg" alt>
          </li>
        </ul>
      </div>
      <div id="planting_btn">
        <ul>
          <!-- <li class="on"></li> -->
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <!-- 头部导航栏 -->
    <div id="coin_box">
      <ul id="menu_box">
        <li>
          <a href>
            <div id="img_box">
              <img src="../../../static/img/top1.png" alt>
            </div>
            <div id="coin_text">榜单</div>
          </a>
        </li>
        <li>
          <a href>
            <div id="img_box">
              <img src="../../../static/img/good1.png" alt>
            </div>
            <div id="coin_text">重磅</div>
          </a>
        </li>
        <li>
          <a href>
            <div id="img_box">
              <img src="../../../static/img/tuijian.png" alt>
            </div>
            <div id="coin_text">新品</div>
          </a>
        </li>
        <li>
          <a href>
            <div id="img_box">
              <img src="../../../static/img/man.png" alt>
            </div>
            <div id="coin_text">男生</div>
          </a>
        </li>
        <li>
          <a href>
            <div id="img_box">
              <img src="../../../static/img/woman.png" alt>
            </div>
            <div id="coin_text">女生</div>
          </a>
        </li>
      </ul>
    </div>
    <!-- 信息提示栏 -->
    <div id="news_box">
      <div id="news_icon">
        <img src="../../../static/img/laba1.png" alt>
      </div>
      <div id="news_text" v-for="(text,index) in arr" :key="index">{{text}}</div>
    </div>
    <!-- 中部推荐信息 -->
    <div id="commont">
      <ul id="commont_box">
        <li v-for="(item,index) in books" :key="index">
                    <div class="book_img" @click.stop="preview(index)">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="book_news" @click.stop="bookdetail(index)">
                        <div class="book_title">
                            {{item.title}}
                        </div>
                        <div class="book_tip">
                            {{item.summary}}
                        </div>
                        <div class="book_author"> 
                            {{item.author}}
                        </div>
                        <div class="book_grade">
                            {{item.average}}
                        </div>
                    </div>
                </li>
      </ul>
    </div>
    <!-- 底部信息栏 -->
    <!-- <bottom>
            <div slot="homepage">
                <img  src="../../../static/img/home1.png" alt="" >
            </div>
           
    </bottom>-->
  </div>
</template>

<script>
import bottom from "@/components/bottom";
export default {
  components: {
    bottom
  },
  data() {
    return {
      arr: [
        "不是被郭德纲发现的，也不是一开始就收为徒弟。",
        "现在雅阁这个状态像极了新A4L上市那段日子。",
        "低配太寒碜，各种需要加装，中配定价过高",
        "然后各种机油门、经销商造反什么的幺蛾子。",
        "看五月销量，建议参考A4，打8折吧。",
        "不是被郭德纲发现的，也不是一开始就收为徒弟。"
      ],
      books: []
    };
  },
  mounted() {
      this.getbook();
  },
  onPullDownRefresh(){
       this.getbook();
  },
  methods:{
      getbook(){
          let thiss = this;
          wx.request({
                  url: "http://localhost:3000/books",
                  data: {
                    
                  },
                  method: "GET",
                  header: {
                    "content-type": "application/json"
                  },
                  success(res) {
                      thiss.books = res.data.result;
                    console.log(res.data.result);
                    // console.log(sale);
                  }
                });
      },
      preview(index) {
      wx.previewImage({
        current: this.books[index].img, // 当前显示图片的http链接
        urls: [this.books[index].img] // 需要预览的图片http链接列表
      });
    },
    bookdetail(index){
        wx.navigateTo({
            url:'/pages/detail/main?number='+this.books[index].number
        })
        // console.log(this.books[index].number)
    }
  }
};
</script>

<style>
/* 轮播图 */
#planting {
  position: relative;
  width: 100%;
  height: 260rpx;
  background-color: rgb(201, 152, 152);
  top: 0px;
}
#planting_box,
#planting_box ul {
  position: absolute;
  width: 100%;
  height: 260rpx;
  z-index: 2;
}
#planting_box {
  animation: plantMove 15s ease-in-out 3s infinite;
}
@keyframes plantMove {
  0% {
    left: 0;
  }
  8% {
    left: -100%;
  }
  33% {
    left: -100%;
  }
  41% {
    left: -200%;
  }
  66% {
    left: -200%;
  }
  74% {
    left: -300%;
  }
  100% {
    left: -300%;
  }
}
.planting_img {
  list-style: none;
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 260rpx;
}
.planting_img:nth-child(2) {
  left: 100%;
}
.planting_img:nth-child(3) {
  left: 200%;
}
.planting_img:nth-child(4) {
  left: 300%;
}
.planting_img img {
  height: 260rpx;
  width: 100%;
}
#planting_btn {
  position: absolute;
  width: 200rpx;
  height: 20rpx;
  z-index: 6;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  /* background-color:rgb(235, 42, 42); */
}
#planting_btn ul li {
  list-style: none;
  width: 20rpx;
  display: inline-block;
  float: left;
  height: 20rpx;
  bottom: 20px;
  border-radius: 20rpx;
  margin-left: 35rpx;
  background-color: #fff;
}
#planting_btn ul .on {
  background-color: rgb(44, 160, 255);
}

/* 目录按钮 */
#coin_box {
  width: 100%;
  height: 130rpx;
  position: relative;
  z-index: 2;
  /* background-color: rgba(18, 212, 187, 0.575); */
}
#menu_box {
  width: 94%;
  margin-left: 3%;
  top: 10rpx;
  height: 120rpx;
  position: relative;
  display: block;
}
#menu_box li {
  list-style: none;
  display: inline-block;
  width: calc(20%);
}
#menu_box li a {
  width: 100rpx;
  height: 110rpx;
  position: relative;
  margin: 0 auto;
}
#img_box {
  width: 80rpx;
  height: 70rpx;
  /* background-color: rgb(89, 187, 89); */
  position: relative;
  margin: 0 auto;
  top: 0;
}
#img_box img {
  width: 70rpx;
  height: 70rpx;
}
#coin_text {
  width: 100%;
  height: 30rpx;
  line-height: 30rpx;
  position: absolute;
  font-size: 14px;
  color: black;
  bottom: 0;
  margin-left: 17rpx;
  letter-spacing: 1px;
}
/* 消息提示 */
#news_box {
  position: relative;
  width: 100%;
  height: 60rpx;
  background-color: rgba(194, 191, 191, 0.541);
  margin-top: 10rpx;
  z-index: 2;
  overflow: hidden;
}
#news_icon {
  width: 60rpx;
  height: 60rpx;
  position: relative;
  margin-left: 3%;
  float: left;
}
#news_icon img {
  width: 100%;
  height: 100%;
}
#news_text {
  font-size: 14px;
  line-height: 60rpx;
  margin-left: 20rpx;
  position: relative;
  float: right;
  margin-right: 10rpx;
  animation: newMove 25s linear infinite;
  width: 85%;
  height: 60rpx;
  padding: 0px;
}
@keyframes newMove {
  0% {
    transform: translateY(0);
  }
  5% {
    transform: translateY(-60rpx);
  }
  20% {
    transform: translateY(-60rpx);
  }
  25% {
    transform: translateY(-120rpx);
  }
  40% {
    transform: translateY(-120rpx);
  }
  45% {
    transform: translateY(-180rpx);
  }
  60% {
    transform: translateY(-180rpx);
  }
  65% {
    transform: translateY(-240rpx);
  }
  80% {
    transform: translateY(-240rpx);
  }
  85% {
    transform: translateY(-300rpx);
  }
  100% {
    transform: translateY(-300rpx);
  }
}
/* 中部主要信息功能 */
#commont {
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}
#commont_box li {
  width: 94%;
  height: 200rpx;
  position: relative;
  display: inline-block;
  margin-top: 14rpx;
  left: 3%;
}
.book_img {
  width: 22%;
  height: 200rpx;
  position: relative;
  float: left;
  overflow: hidden;
}
.book_img img {
  width: 100%;
  height: 100%;
}
.book_news {
  width: 78%;
  height: 200rpx;
  position: relative;
  float: left;
}
.book_title {
  position: absolute;
  font-size: 30rpx;
  top: 10rpx;
  left: 30rpx;
  font-weight: 600;
}
.book_tip {
  position: absolute;
  font-size: 26rpx;
  top: 60rpx;
  left: 30rpx;
  width: 95%;
  height: 70rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #999;
}
.book_author {
 position: absolute;
    bottom: 16rpx;
    left: 30rpx;
    font-size: 26rpx;
    display: -webkit-box;
    width: 50%;
    height: 20px;
    overflow: hidden;
}
.book_grade {
  position: absolute;
  right: 60rpx;
  bottom: 10rpx;
  font-size: 36rpx;
  color: rgb(54, 114, 243);
}
</style>

