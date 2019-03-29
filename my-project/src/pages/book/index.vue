<template>
  <div>
    <div id="title_box">
      我的书库
      </div>
      <div class="login" v-show="!openId" @click.stop="tomy()">
        请先登录，再添加图书
      </div>

    <div id="commont">
      <ul id="commont_box">
        <li v-for="(item,index) in books" :key="index">
          <!-- <a href="../../pages/todolist/main" > -->
          <div class="book_img" @click.stop="preview(index)">
            <img :src="item.img" alt>
          </div>
          <div class="book_news" @click.stop="bookdetail(index)">
            <div class="book_title">{{item.title}}</div>
            <div class="book_tip">{{item.summary}}</div>
            <div class="book_author">{{item.author}}</div>
            <div class="book_grade">{{item.average}}</div>
          </div>
          <!-- </a> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bottom from "@/components/bottom";
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      openId:''
    };
  },
  components: {
    bottom
  },
  mounted() {
    console.log("555555555555555555");
    this.get();
  },
  onPullDownRefresh() {
    this.get();
  },
  methods: {
    get() {
      let thiss = this;
      this.openId = wx.getStorageSync("openId");
      if(!this.openId){
        console.log("请先登录，再添加图书!")
      }
      else{
        wx.request({
        url: "http://localhost:3000/users/check",
        data: {
          openId: wx.getStorageSync("openId")
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          thiss.books = res.data.result;
        }
      });
      }
      
    },
    //图片展示
    preview(index) {
      wx.previewImage({
        current: this.books[index].img, // 当前显示图片的http链接
        urls: [this.books[index].img] // 需要预览的图片http链接列表
      });
    },
    //页面跳转
    bookdetail(index){
        wx.navigateTo({
            url:'/pages/detail/main?number='+this.books[index].number
        })
        // console.log(this.books[index].number)
    },
    tomy(){
      console.log("跳转到个人页面！")
        wx.switchTab({
            url:'/pages/my/main'
        })
    },
    searchbook(isbbn) {
      wx.request({
        url: `http://localhost/db/isbn/:9787506365437`,
        data: {},
        method: "GET",
        header: {
          "content-type": "application/xml"
        },
        success(res) {
          console.log(res.data);
          console.log(res.data.price);
        }
      });
    }
  }
};
</script>

<style>
/* 头部标题 */
#title_box{
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: rgba(235, 235, 235, 0.432);
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  letter-spacing: 5px;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
}
/* 提示 */
.login{
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  top: 40%;
}
/* 内容列表 */
#commont {
  position: relative;
  width: 100%;
  /* height: 1600rpx; */
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

