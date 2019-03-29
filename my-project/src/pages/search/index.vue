<template>
    <div>
        <div id=top_box>
            <div id="search_box">
                <div id="search_icon" @tap="search()">
                    <img src="../../../static/img/search2.png" alt="">
                </div>
                <div id="search_text">
                    <input id="search_data" type="text"  placeholder="请输入你要搜素的内容" v-model="list_books[0].sort">
                </div>
                <div id="search_code" @click="scanBook">
                     <img src="../../../static/img/code4.png" alt="">
                </div>
            </div>
        </div>
        <div id="list_box">
            <scroll-view id="list_menu" >
                <ul>
                    <li v-for="(item,index) in list_menu" :key="index" 
                    class="list_menu" :class="index===currentIndex?'onit':''" @tap="selectMenu(index)">
                        {{item}}
                    </li>
                </ul>
            </scroll-view>
            <scroll-view id="list_book" scroll-y="true"
            :scroll-into-view="contentId" 
            scroll-with-animation="true">
                <ul>
                    <li v-for="(book,i) in list_books" :key="i">
                        <ul>
                        <div class="list_title" :id="'con_'+i">{{book.sort}} 共{{book.list.length}}本图书</div>
                        <li v-for="(item,index) in book.list" :key="index" >
                        <div class="book_box">
                            <img :src="item.image" alt="" @click.stop="preview(i,index)">
                            <div class="book_box_text" @click.stop="bookdetail(i,index)">
                            <div class="book_title">
                                {{item.title}}
                            </div>
                            <div class="book_tip">
                                {{item.author}}
                            </div>
                            </div>
                        </div>
                        </li>
                        </ul>
                    </li>        
                </ul>
            </scroll-view>
        </div>
    </div>
</template>

<script>
import bottom from '@/components/bottom'
export default {
    data(){
        return{
            currentIndex:1,
            contentId:'con_1',
            list_menu:["其他","热销","男生","女生","漫画","杂志","文学"],
            list_books:[
                {
                     sort:"",
                     list:[
                        
                     ]

                 },  
                 {
                     sort:"热销",
                     list:[
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book8.jpg"},
                        {title:"计算机",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"历史",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"生活",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"动漫绘本",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"传记",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"原创文学",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"两性情感",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"自然科学",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"少儿",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"旅游",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"政治军事",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"艺术",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"法律",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"教育",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"外语",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"进口原版",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"}
                     ]

                 },
                 {
                     sort:"男生",
                     list:[
                        {title:"玄幻",author:"东方玄幻 异界大陆",image:"../../static/img/book8.jpg"},
                        {title:"奇幻",author:"领主贵族 西方奇幻",image:"../../static/img/book2.jpg"},
                        {title:"武侠",author:"传统武侠 新派武侠",image:"../../static/img/book3.jpg"},
                        {title:"都市",author:"都市生活 爱情婚姻",image:"../../static/img/book4.jpg"},
                        {title:"仙侠",author:"古典仙侠 幻想修仙",image:"../../static/img/book5.jpg"},
                        {title:"历史",author:"架空历史 上古先秦",image:"../../static/img/book6.jpg"},
                        {title:"军事",author:"战争幻想 谍战特工",image:"../../static/img/book7.jpg"},
                        {title:"灵异",author:"推理侦探 恐怖惊悚",image:"../../static/img/book1.jpg"},
                        {title:"科幻",author:"星际战争 时空穿梭",image:"../../static/img/book2.jpg"},
                        {title:"游戏",author:"游戏生涯 电子竞技",image:"../../static/img/book3.jpg"},
                        {title:"竞技",author:"体育竞技 篮球运动",image:"../../static/img/book7.jpg"},
                        {title:"职场",author:"职场明显 官场沉浮",image:"../../static/img/book1.jpg"},
                        {title:"同人",author:"武侠同人 应是同人",image:"../../static/img/book2.jpg"},
                        {title:"短篇",author:"影视剧本 评论文集",image:"../../static/img/book3.jpg"}
                     ]

                 },    
                 {
                     sort:"女生",
                     list:[
                        {title:"玄幻言情",author:"言情科幻 悬疑推理",image:"../../static/img/book8.jpg"},
                        {title:"古代言情",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"仙侠奇缘",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"现代言情",author:"言情科幻 悬疑推理",image:"../../static/img/book4.jpg"},
                        {title:"浪漫青春",author:"言情科幻 悬疑推理",image:"../../static/img/book5.jpg"},
                        {title:"科幻空间",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"悬疑灵异",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"游戏竞技",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"}
                     ]

                 },
                 {
                     sort:"漫画",
                     list:[
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book8.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book4.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book5.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"}
                     ]

                 },
                 {
                     sort:"杂志",
                     list:[
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book8.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book4.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book5.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"}
                     ]

                 },
                 {
                     sort:"文学",
                    list:[
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book8.jpg"},
                         {title:"经管",author:"经济管理 投资理财",image:"../../static/img/book2.jpg"},
                        {title:"成功励志",author:"成功处世 个人修养",image:"../../static/img/book3.jpg"},
                        {title:"人文社科",author:"哲学宗教 语言社会",image:"../../static/img/book4.jpg"},
                        {title:"文学",author:"言情科幻 悬疑推理",image:"../../static/img/book5.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book4.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book5.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book6.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book7.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book1.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book2.jpg"},
                        {title:"小说",author:"言情科幻 悬疑推理",image:"../../static/img/book3.jpg"}
                
                     ]

                 }
            ]

        }
    },
  components: {
    bottom
  },
  mounted:function(){
      this.getGoodsList();


  },
  methods:{
      //设置瞄点
      getGoodsList(){
      },
      selectMenu(index){
          this.contentId = `con_${index}`;
          this.currentIndex = index;
      },
    //   调用扫码api
      scanBook(){
         wx.scanCode({
             success(res) {
                  console.log(res.result)
                  wx.navigateTo({
                url:'/pages/detail/main?number='+res.result
                 })
                }
            })
        },
        // 发送搜索请求count=20
        search(){
            console.log("搜索事件触发！");
            let key = this.list_books[0].sort
            let thiss = this;
            wx.showToast({
              icon: "loading",
              title: "加载中"
            });
            wx.request({
                url: `http://localhost/db/search?tag=${key}&count=20`,
                data: {},
                method: "GET",
                header: {
                    "content-type": "application/xml"
                },
                success(res) {
                console.log(res.data.books);
                thiss.list_books[0].list=res.data.books;
                thiss.currentIndex = 0;
                thiss.contentId = `con_0`;
                }
             });
        },
            //图片展示
        preview(i,index) {
            wx.previewImage({
                current: this.list_books[i].list[index].image, // 当前显示图片的http链接
                urls: [this.list_books[i].list[index].image] // 需要预览的图片http链接列表
            });
        },
        //页面跳转
        bookdetail(i,index){
            wx.navigateTo({
                url:'/pages/detail/main?number='+this.list_books[i].list[index].isbn13
            })
            // console.log(this.books[index].number)
        }
    }
}

</script>

<style>
/* 头部搜索框样式 */
#top_box{
    width: 100%;
    height: 80rpx;
    position: relative;
    background-color: rgba(177, 173, 173, 0.4);
}
#search_box{
    width: 100%;
    height: 100%;
    position: relative;
}
#search_icon,#search_code{
    width: 10%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
#search_icon{
    float: left;
}
#search_code{
    float: right;
}
#search_box img{
    width: 70%;
    height: 70%;
    position: relative;
    top: 15%;
    left: 15%;
}
#search_text{
    width: 80%;
    position: absolute;
    left: 9.5%;
    height: 66%;
    top: 17%;
    background-color: #fff;
    border-radius: 10rpx;
}
#search_data{
    text-align: center;
    font-size: 28rpx;
    height: 100%;
    width: 100%;
    line-height: 100%;
}
/* 内容分类部分 */
#list_box{
    position: absolute;
    width: 100%;
    top: 40px;
    height: calc(100% - 40px);
    /* background-color: #263; */
}
#list_menu{
    position: relative;
    width: 16%;
    height: 100%;
    background-color: rgba(177, 173, 173, 0.4);
    float: left;
}
.list_menu{
    list-style: none;
    width: 100%;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 12px;
    font-weight: 600;
}
.list_menu:hover{
    background-color: #fff;
}
.onit{
    background-color: #fff;
}

/* 分类图书 */
#list_book{
    width: 80%;
    height: 100%;
    position: relative;
    float: left;
    padding-left: 2%;
    padding-right: 2%;
    overflow: scroll;
}
#list_book::-webkit-scrollbar{
width: 0;
height: 0;
color: transparent;
}

.list_title{
    width: 100%;
    height: 30px;
    background-color: #fff;
    position: relative;
    font-size: 11px;
    line-height: 30px;
    float: left;
}
.book_box{
    width: 50%;
    height: 40px;
    /* background-color: #999; */
    overflow: hidden;
    float: left;
    position: relative;
    margin: 15rpx 0;
}
.book_box img{
    position: absolute;
    width: 20%;
    height: 100%;
}
.book_box .book_title{
    font-size: 11px;
    position: absolute;
    left: 25%;
    top: 5rpx;
    width: 100px;
    height: 17px;
    overflow: hidden;
    font-weight: 700;
    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.book_box .book_tip{
    font-size: 9px;
    position: absolute;
    left: 25%;
    bottom: 5rpx;width: 100px;
    height: 13px;
    overflow: hidden;
    font-weight: 700;
    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>

