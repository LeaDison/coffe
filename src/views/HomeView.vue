<template>
  <div class="home">
    <div class="head">
      <div class="head-desc">{{ timeText }} <span>{{ myInfo.nickName }}</span></div>
      <div class="head-search">
        <van-search disabled shape="round" placeholder="请输入商品名称" />
      </div>
    </div>
    <div class="banner">
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="#0c34ba">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.bannerImg" alt="" />
          <div class="banner-name">{{ item.name }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot">
      <div class="hot-title">
        <div class="hot-title-box">热卖推荐</div>
      </div>
      <div class="hot-list">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item,index) in HotList" :key="index">
            <div class="hot-img">
              <img :src="item.smallImg" alt="">
            </div>
            <div class="hot-name">{{ item.name }}</div>
            <div class="hot-enname one-text">{{ item.enname }}</div>
            <div class="hot-price">￥{{ item.price }}</div>
            <div class="hot-icon">hot</div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
  
  <script>
import res from "../request/request";
export default {
  data() {
    return {
      timeText: "",
      timer: null,
      bannerList: [],
      HotList: [],
    };
  },
  props:["myInfo"],
  created() {
    this.getTime();
    this.getBannerList();
    this.getHotList();
  },
  methods: {
    getTime() {
      let time = new Date().getHours();
      console.log(time); //test
      if (time >= 5 && time < 11) {
        this.timeText = "早上好";
      } else if (time >= 11 && time < 20) {
        this.timeText = "下午好";
      } else if (time >= 20 && time < 24) {
        this.timeText = "晚上好";
      } else if (time >= 0 && time < 5) {
        this.timeText = "夜深了";
      }
    },
    getNewTime() {
      this.timer = setInterval(() => {
        this.getTime();
      }, 1000);
    },
    getBannerList() {
      res.request({
          url: "/banner",
        })
        .then((data) => {
          console.log("轮播图数据", data);
          this.bannerList = data;
        });
    },
    getHotList() {
      res.request({
          url: "/typeProducts",
          params: {
            key: "isHot",
            value: "1",
          },
        })
        .then((data) => {
          console.log("热卖商品数据", data);
          this.HotList = data;
        });
    },
  },

  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    this.timer = null;
    next();
  },
  activated(){
    console.log("路由缓存触发");
    this.getTime();
    this.getNewTime();
  }
};
</script>
  
  <style lang="less" scoped>
.home {
  img{
    width: 100%;
  }
  // height: 100vh;
  min-height: 100vh;
  background: #f7f7f7;
  .head {
    display: flex;
    .head-desc {
      line-height: 54px;
      font-weight: bold;
      color: #64696e;
      max-width: 150px;
      padding: 0 10px;
      text-align: center;
      background: #fff;
      span {
        color: #0c34ba;
      }
    }
    .head-search {
      flex: 1;
    }
  }
  .banner {
    height: 265px;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    /deep/ .van-swipe__indicators {
      left: 88%;
    }
    /deep/ .van-swipe__indicator {
      width: 10px;
      height: 2px;
      border-radius: 0;
      background: #646566;
      opacity: 1;
    }
  }
  .banner-name {
    position: absolute;
    left: 10px;
    bottom: 30px;
    background: #cccc;
    padding: 4px 10px;
    border-radius: 20px;
    color: #fff;
  }

  .hot{
    .hot-title{
      margin: 10px;;
      background: #fff;
      padding: 10px 0;
      .hot-title-box{
        width: 100px;
        height: 30px;
        background: #0c34ba;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        border-top-right-radius: 18px;
      }
    }
    .hot-list{
      margin: 10px;
      padding-bottom: 40px;
      img{
        border-radius: 10px;
      }
      /deep/ .van-grid-item__content--center{
        align-items: flex-start;
        border-radius: 10px;
      }
      /deep/ .van-grid{
        justify-content: space-between;
      }
      /deep/ .van-grid-item{
        flex-basis: 48.5% !important;
        margin-bottom: 10px;
        position: relative;
      }
      .hot-name{
        font-size: 16px;
        color: #68677d;
        margin-top: 10px;
      }
      .hot-enname{
        font-size: 12px;
        color: #9ba7c3;
        margin: 10px 0;
        width: 150px;
      }
      .hot-price{
        color: #0c34ba;
        font-weight: bold;
      }
      .hot-icon{
        position: absolute;
        top: 10px;
        left: 20px;
        color: #fff;
        background-color: #0c34ba;
        text-align: center;
        line-height: 28px;
        width: 30px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      /deep/ .van-grid-item__content{
        padding: 10px 8px;
      }
    }
  }

}
</style>