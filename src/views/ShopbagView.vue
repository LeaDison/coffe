<template>
  <div class="shopbag">
    <van-nav-bar
      title="购物袋"
      left-text="返回"
      right-text="编辑"
      left-arrow
    />
    <div>
      <img src="../assets/icon/shopbag_bg.png" alt="" />
    </div>
    <div class="bag">
      <!-- 没有商品的情况 -->
      <div class="goods-none" v-if="!proList.length">
        <van-empty class="cuttom-image" description="现在无商品">
          <template #image>
            <img src="../assets/icon/kong.png" alt="" />
          </template>
          <div class="button" @click="goMenu">去逛一逛</div>
        </van-empty>
      </div>
      <!-- 有商品的情况 -->
      <div class="goods" v-else>
        <div class="check">
          <van-checkbox v-model="checked">复选框</van-checkbox>
        </div>
        <img alt="" class="b-img" />\
        <div class="goods-cn-name">
          <div class="name"></div>
          <div class="state"></div>
        </div>
        <div class="goods-en-name"></div>
        <div class="goods-price"></div>
        <div class="num">
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>


      </div>

      <div class="submit">
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
          <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      checked: true,
      proList: [],
    };
  },
  methods: {
    onSubmit() {},
    goMenu() {
      this.$router.push({
        name: "Menu"
      });
    },
    
  },
  beforeRouteEnter(to, from, next) {
        // localStorage.setItem("TOKEN",1111)
        console.log(to,from);
      let isToken = localStorage.getItem("TOKEN");
      if (!isToken) {
        console.log("无登录");
        next(vm => {
          vm.$toast("没有登录请登录");
          // 路由跳转
          setTimeout(() => {
            vm.$router.push({
              name: "Login",
            });
          }, 1000);
        });
      } else {
        next();
      }
    },
};
</script>
  
<style lang="less" scoped>
.shopbag {
  img{
    width: 100%;
  }
  /deep/ .van-submit-bar {
    bottom: 50px;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #0c34ba;
  }
  /deep/ .van-nav-bar__text {
    color: #0c34ba;
  }
  /deep/ .van-nav-bar__right {
    .van-nav-bar__text {
      color: #666567;
    }
  }
  .goods-none{
    /deep/ .custom-image .van-empty__image{
      width: 90px;
      height: 90px;
    }
    .button{
      width: 100px;
      height: 30px;
      background: #bfbfbf;
      color: #fff;
      text-align: center;
      line-height: 30px;
      margin: 0 auto;
      border-radius: 20px;
    }
  }
  
}
</style>