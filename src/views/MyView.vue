<template>
  <div class="my">
    <div class="my-bg">
      <div @touchstart="start" @touchmove="move" @touchend="end">
        <img :src="mydata.userBg" alt="" />
      </div>

      <div class="updatebg">
        <van-uploader :after-read="afterRead">
          <template #default>
            <img src="../../../../图片/杂/197760209.jpg" alt="" />
          </template>
        </van-uploader>
      </div>
    </div>

    <div class="content">
      <div class="content-head">
        <div class="content-head-img">
          <img v-if="!isToken" src="../../../../图片/杂/蓝玫瑰.jpeg" alt="" />

          <img v-else :src="myInfo.userImg" alt="" />
        </div>

        <div class="content-head-info">
          <!-- 未登录信息 -->
          <!-- <div
            v-if="!isToken"
            class="head-info-out"
            @click="$router.push('/login')"
          >
            请先登录
          </div> -->

          <!-- 已经登录信息 -->
          <div
            v-if="!isLogin"
            class="head-info-out"
            @click="$router.push('/login')"
          >
            请先登录
          </div>
          <div v-else class="head-info-in">
            <div class="head-info-in-name">{{ myInfo.nickName }}</div>
            <div class="desc" v-if="!myInfo.desc">
              这家伙很懒，什么也没有留下
            </div>
            <div class="desc one-text" v-else>{{ myInfo.desc }}</div>
          </div>
        </div>
      </div>

      <div class="ontent-cell">
        <van-cell title="个人资料" is-link to="/Person" />
        <van-cell title="我的订单" is-link />
        <van-cell title="我的收藏" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="设置" is-link to="/safety" />
      </div>
    </div>
  </div>
</template>
<!-- 1.预览图片
1.1.长按背景图，超过两秒，出现预览图
需要知识点：事件（鼠标按下和鼠标弹起，鼠标移动重新计算时间）
1.2.更新背景图
1.2.1，点击更换的装饰开始选择图片进行更换 -->
  <script>
import res from "../request/request";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      mydata: [],

      isToken: localStorage.getItem("TOKEN"),
      head: {
        src: "../assets/icon/head.png",
      },

      components: {
        [ImagePreview.Component.name]: ImagePreview.Component,
      },
    };
  },
  props: ["myInfo", "isLogin"],
  created() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      let isToken = localStorage.getItem("TOKEN");

      res
        .request({
          url: "/findMy",
          params: {
            tokenString: isToken,
          },
        })
        .then((data) => {
          this.mydata = data[0];
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let isToken = localStorage.getItem("TOKEN");
      // console.log(file);
      let type = file.file.type.substring(6);
      let str = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      // console.log(type);
      // console.log(str);
      res
        .request({
          url: "/updateUserBg",
          method: "post",
          data: {
            tokenString: isToken,
            imgType: type,
            serverBase64Img: str,
          },
        })
        .then((data) => {
          console.log("图片信息", data);

          this.$toast.success("上传成功");
          this.$nextTick(() => {
            this.$router.go(0);
          });
        });
    },

    start() {
      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        //预览
        this.showImg();
        console.log("触发长按成功");
      }, 2000);
    },
    showImg() {
      ImagePreview({
        images: [this.mydata.userBg],

        closeable: true,
      });
    },

    move() {
      clearTimeout(this.loop); //清空定时器，防止重复注册定时器
    },
    end() {
      clearTimeout(this.loop); //清空定时器，防止重复注册定时器
    },
  },
};
</script>
  
  <style lang="less" scoped>
.updatebg {
  float: left;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 5px;
}
.my {
  img {
    width: 100%;
  }
  min-height: 100vh;
  background: #f7f7f7;
  .my-bg {
    height: 180px;
    overflow: hidden;
  }
  .content {
    height: 400px;
    background: #fff;
    margin: 10px;
    position: relative;
    top: -60px;
    opacity: 0.9;
    border-radius: 10px;
  }
  .content-head {
    display: flex;
    padding: 10px;
    align-items: center;
  }
  .content-head-img {
    overflow: hidden;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-head-info {
    margin-left: 20px;
    .head-info-out {
      margin-left: 20px;
      width: 80px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #666;
    }
    .head-info-in {
      width: 240px;
      .head-info-in-name {
        margin-bottom: 10px;
        color: #0c34ba;
        font-weight: 600;
      }
      .desc {
        width: 100%;
        font-size: 14px;
      }
    }
  }
}
</style>