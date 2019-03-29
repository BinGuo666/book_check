<template>
  <div>
    <div id="bottom_box">
      <ul>
        <li>
          <div class="list_box">
            <a href="/pages/todolist/main" class="list_icon">
            <slot name="homepage"></slot>
              <img src="../../static/img/home.png" alt="" >
            </a>
          </div>
        </li>
        <li>
          <div class="list_box">
            <a href="/pages/search/main" class="list_icon">
             <slot name="searchpage"></slot>
              <img src="../../static/img/search.png" alt="" >
            </a>
          </div>
        </li>
        <li>
          <div class="list_box">
            <a href="/pages/book/main" class="list_icon">
            <slot name="bookpage"></slot>
              <img src="../../static/img/book.png" alt="" >
            </a>
          </div>
        </li>
        <li>
          <div class="list_box">
            <a href="/pages/my/main" class="list_icon">
             <slot name="mypage"></slot>
              <img src="../../static/img/my.png" alt="" >
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
#bottom_box{
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom:0;
  border-top: 3rpx solid rgb(114, 111, 111);
  background-color: #fff;
  z-index: 100;
  margin-top: 100rpx;
}
#bottom_box ul li{
  width: 25%;
  height: 100%;
  position: relative;
  float: left;
  list-style: none;
  display: inline-block;
}
.list_box{
  width: 70rpx;
  height: 70rpx;
  background-color: rgba(255, 255, 255, 0.404);
  position: relative;
  margin: 0 auto;
  top:20rpx;
  overflow: hidden;
  }
  .list_icon img{
    width: 70rpx;
    height: 70rpx;
    position: relative;
    margin: 0 auto
  }
</style>
