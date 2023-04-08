<template>
  <div class="myinfo">
    <div class="head">
      <van-nav-bar
        title="个人资料"
        left-text="返回"
        left-arrow
        @click-left="onclickleft"
      />
    </div>
    <div class="main">
      <div class="bg"></div>
      <div class="info">
        <div class="cel">
          <van-cell-group inset>
            <van-cell title="头像" value="内容">
              <template #default>
                <div class="headimg">
                  <van-uploader :after-read="afterRead">
                    <template #default>
                      <img :src="myInfo.userImg" alt="" class="himg" />
                    </template>
                  </van-uploader>
                </div>
              </template>
            </van-cell>
            <van-cell title="用户id" value="内容">
              <template #default>
                <div class="id">{{ myInfo.userId }}</div>
              </template>
            </van-cell>
            <van-cell title="手机号码" value="内容">
              <template #default>
                <div class="phone">{{ myInfo.phone }}</div>
              </template>
            </van-cell>
            <van-cell title="会员等级" value="内容">
              <template #default>
                <div class="vip">{{ myInfo.vip }}</div>
              </template>
            </van-cell>
            <van-cell title="昵称" value="内容">
              <template #default>
                <van-field
                  v-model="nickName"
                  :placeholder="myInfo.nickName"
                  maxlength="5"
                  input-align="right"
                  @blur="updateNickName"
                />
              </template>
            </van-cell>
            <van-cell title="简介" value="内容" class="desc">
              <template #default>
                <van-field
                  v-model="desc"
                  rows="1"
                  autosize
                  type="textarea"
                  :placeholder="myInfo.desc"
                  input-align="right"
                  maxlength="50"
                  @blur="updateDesc"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
  <!-- <router-view  :mydata="mydata" :isLogin="isLogin"/> -->
</template>
<script>
import res from "../request/request";
export default {
  data() {
    return {
      nickName: "",
      desc: "",
    };
  },
  props: ["myInfo"],
  methods: {
    onclickleft() {
      this.$router.push({
        name: "My",
      });
    },
    updateNickName() {
      let isToken = localStorage.getItem("TOKEN");
      let nickname = this.nickName;
      this.$dialog
        .confirm({
          title: "确认",
          message: "是否确认上传？",
        })
        .then(() => {
          res
            .request({
              url: "/updateNickName",
              method: "post",
              data: {
                tokenString: isToken,
                nickName: nickname,
              },
            })
            .then((data) => {
              console.log("昵称", data);

              this.$toast.success("上传成功");
              this.$nextTick(() => {
                this.$router.go(0);
              });
            });
        })
        .catch(() => {
          return;
        });
    },
    updateDesc() {
      let isToken = localStorage.getItem("TOKEN");
      let desc = this.desc;
      this.$dialog.confirm({
        title: "确认",
        message: "是否确认上传？",
      })
        .then(() => {
          res
        .request({
          url: "/updateDesc",
          method: "post",
          data: {
            tokenString: isToken,
            desc: desc,
          },
        })
        .then((data) => {
          console.log("简介信息", data);

          this.$toast.success("上传成功");
          this.$nextTick(() => {
            this.$router.go(0);
          });
        });
        })
        .catch(() => {
          return;
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
          url: "/updateAvatar",
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
  },
};
</script>
<style lang="less" scoped>
.myinfo {
  .head {
    background: #f7f7f7;
    /deep/ .van-nav-bar .van-icon {
      color: #0c34ba;
    }
    /deep/ .van-nav-bar__text {
      color: #0c34ba;
    }
  }
  .main {
    height: auto;
    .bg {
      height: 100px;
      background: #062dda;
    }
    .info {
      height: 450px;
      background: rgb(255, 255, 255);
      .cel {
        height: 450px;
        position: relative;
        bottom: 25px;
        .headimg {
          width: 30px;
          height: 30px;
          position: absolute;
          right: 0;
          border-radius: 50%;
          overflow: hidden;
          text-align: right;
          .himg {
            height: 100%;
            width: 100%;
            display: inline-block;
          }
        }
        .desc {
          height: 60px;
        }
      }
    }
  }
}
/deep/.van-nav-bar__left {
  .van-nav-bar__text {
    color: #062dda;
    font-weight: bolder;
  }
}
/deep/ .van-cell-group--inset {
  margin: 0;
  border-radius: 0px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
/deep/ .van-cell {
  align-items: center;
  overflow: visible;
}
/deep/ .van-cell__value {
  position: relative;
  height: 30px;
  width: 30px;
  overflow: visible;
}
/deep/ .van-field {
  padding: 0;
}
// /deep/[data-v-3fd40c79] .van-cell-group--inset {
//   height: 100%;
// }
</style>
