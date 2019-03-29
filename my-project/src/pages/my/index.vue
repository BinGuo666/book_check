<template>
  <div>
    <div class="container">
      <div class="userinfo">
        <img :src="user.avatarUrl" alt>
        <p>{{user.nickName}}</p>
      </div>
    </div>

    <YearProgress></YearProgress>
    <button class="btn1" @click="scanBook" v-show="!login">添加图书</button>
    <!-- 
        <open-data type="userAvatarUrl"></open-data>
    <open-data type="userNickName"></open-data>-->
    <button class="btn2" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1" v-show="login">用户登录</button>
  </div>
</template>

<script>
import bottom from "@/components/bottom";
import YearProgress from "@/components/YearProgress";
// wx.getUserInfo({
//   success(res) {
//     const userInfo = res.userInfo
//     const nickName = userInfo.nickName
//     const avatarUrl = userInfo.avatarUrl
//     const gender = userInfo.gender // 性别 0：未知、1：男、2：女
//     const province = userInfo.province
//     const city = userInfo.city
//     const country = userInfo.country

//   }
// })
export default {
  data() {
    return {
      user: {},
      ll: "jlkj",
      userId: "",
      login:true
    };
  },
  components: {
    bottom,
    YearProgress
  },
  mounted() {
    var ss = this;
    // 一进来看看用户是否授权过
    wx.login({
      //获取code
      success: function(res) {
        var code = res.code; //返回code
        console.log(code);
        var appId = "wxbdfc06ae05fdce63";
        var secret = "098046cc43567235c7f523939a2d812c";
        wx.request({
          url:
            "https://api.weixin.qq.com/sns/jscode2session?appid=" +
            appId +
            "&secret=" +
            secret +
            "&js_code=" +
            code +
            "&grant_type=authorization_code",
          data: {},
          header: {
            "content-type": "json"
          },
          success: function(res) {
            var openId = res.data.openid; //返回openid
            ss.userId = openId;
            ss.getSetting();
            console.log("openid为" + openId);
            wx.setStorageSync("openId", openId);
          }
        });
      }
    });
  },
  methods: {
    getSetting() {
      var sale = this;
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.showToast({
              icon: "loading",
              title: "加载中"
            });
            wx.getUserInfo({
              success: function(res) {
                //用户已经授权过
                console.log("用户已经授权过");
                console.log("userid为" + sale.userId);
                sale.user = res.userInfo;
                console.log(sale.user);

                wx.request({
                  url: "http://localhost:3000/users/login",
                  data: {
                    openId: sale.userId,
                    userName: sale.user.nickName,
                    userImg: sale.user.avatarUrl,
                    userProvince: sale.user.province
                  },
                  method: "POST",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success(res) {
                    console.log(res.data);
                    console.log(sale);
                    wx.showToast({
                      title: "登陆成功",
                      icon: "success"
                    });
                    sale.login = false;
                  }
                });
              }
            });
          } else {
            console.log("用户还未授权过");
          }
        }
      });
    },
    getUserInfo1() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
        wx.reLaunch({
          url: "../my/main"
        });
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    searchbook(isbbn) {
      let thiss = this;
      wx.request({
        url: `http://localhost/db/isbn/:${isbbn}`,
        data: {},
        method: "GET",
        header: {
          "content-type": "application/xml"
        },
        success(res) {
          if (res.data.msg == "book_not_found") {
            wx.showToast({
              title: "书库未发现该图书",
              duration: 2000
            });
          } else {
            let booknews = {
              number: isbbn,
              author: res.data.author,
              title: res.data.title,
              publisher: res.data.publisher,
              numberRater: res.data.rating.numRaters,
              average: res.data.rating.average,
              summary: res.data.summary,
              price: res.data.price,
              tags: JSON.stringify(res.data.tags),
              img: res.data.images.small
            };

            // console.log(res.data);
            console.log(booknews.tags[0]);
            console.log(res.data);
            thiss.addBook(booknews, wx.getStorageSync("openId"));
          }
        }
      });
    },
    addBook(booknews, openId) {
      let thiss = this;
      wx.request({
        url: "http://localhost:3000/users/addbook",
        data: {
          openId: openId,
          number: booknews.number,
          author: booknews.author,
          title: booknews.title,
          publisher: booknews.publisher,
          numberRater: booknews.numberRater,
          average: booknews.average,
          summary: booknews.summary,
          price: booknews.price,
          tags: booknews.tags,
          img: booknews.img
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res.data);
          if(res.data.status == "303"){
            wx.showToast({
            title: "添加失败，图书已存在！",
            icon:"none"
          });
          }else{
            wx.showToast({
            title: "添加成功",
            icon: "success"
          });
          }
          
        }
      });
    },
    scanBook() {
      console.log("jlk");
      let thiss = this;
      wx.scanCode({
        success(res) {
          if (res.result) {
            console.log(res.result);
            thiss.searchbook(res.result);
          }
        }
      });
    }
  }
};
</script>

<style>
.container {
  padding: 0 30rpx;
  position: relative;
  width: 100%;
  height: 160px;
  /* background: #000; */
}
.userinfo {
  margin-top: 60px;
  position: relative;
  width: 100px;
  height: 100px;
  /* background-color: #ff0; */
  left: 32%;
  /* margin: 0 auto; */
  /* transform: translateX(-50%); */
}
.userinfo img {
  width: 100px;
  height: 100px;
  position: relative;
  top: 50%;
}
.userinfo p {
  text-align: center;
}
.btn1 {
  color: white;
  background: #0099ff;
  margin-bottom: 10px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  margin-top: 150px;
}
.btn2{
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  margin-top: 150px;
}
.btn1:active {
  background: rgb(0, 102, 255);
}
button {
  margin-left: 30px;
  margin-right: 30px;
}
</style>

