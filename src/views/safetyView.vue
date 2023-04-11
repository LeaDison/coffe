<template>
  <div class="save">
    <div class="safe">
      <div class="head">
        <van-nav-bar
          title="安全中心"
          left-text="返回"
          left-arrow
          @click-left="onclickleft"
        />
      </div>
      <div class="bg"></div>
      <div class="content">
        <van-cell-group class="content-cell" inset>
          <van-cell
            size="large"
            title="修改密码"
            is-link
            @click="show = true"
          />
          <van-cell
            size="large"
            title="注销账号"
            is-link
            @click="cancellation"
          />
        </van-cell-group>
        <div class="button" @click="out">
          <van-button
            round
            type="info"
            size="large"
            text="退出登录"
          ></van-button>
        </div>
      </div>
    </div>
    <van-action-sheet v-model="show" title="修改密码">
      <div class="updatecontent">
        <van-form @submit="updatepassword" @failed="onFailed">
          <van-field
            v-model="newPassword"
            label="新密码"
            name="newPassword"
            :type="!passwordStatus1 ? 'password' : 'text'"
            placeholder="密码必须为字母开头"
            :right-icon="!passwordStatus1 ? 'closed-eye' : 'eye-o'"
            @click-right-icon="passwordStatus1 = !passwordStatus1"
            :rules="password_rule"
          />
          <van-field
            v-model="oldPassword"
            label="旧密码"
            name="oldPassword"
            :type="!passwordStatus2 ? 'password' : 'text'"
            placeholder="密码必须为字母开头"
            :right-icon="!passwordStatus2 ? 'closed-eye' : 'eye-o'"
            @click-right-icon="passwordStatus2 = !passwordStatus2"
            :rules="password_rule"
          />
          <div style="margin: 36px 12px 5px 12px">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Dialog } from "vant";
import res from "../request/request";
export default {
  data() {
    return {
      show: false,
      oldPassword: "",
      newPassword: "",
      passwordStatus1: false,
      passwordStatus2: false,
      password_rule: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "onBlur",
        },
        {
          pattern: /^[A-Za-z][A-Za-z\d]{5,15}$/,
          message: "密码格式错误",
          trigger: "onBlur",
        },
      ],
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  methods: {
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    onclickleft() {
      this.$router.push({
        name: "My",
      });
    },
    updatepassword() {
      let isToken = localStorage.getItem("TOKEN");
      res
        .request({
          url: "/updatePassword",
          method: "post",
          data: {
            tokenString: isToken,
            password: this.newPassword,
            oldPassword: this.oldPassword,
          },
        })
        .then((data) => {
          console.log(data);
          this.$router.push({
            name: "Login",
          });
        });
    },
    out() {
      let isToken = localStorage.getItem("TOKEN");
      res
        .request({
          url: "/logout",
          method: "post",
          data: {
            tokenString: isToken,
          },
        })
        .then((data) => {
          localStorage.removeItem("TOKEN", data.token);
          this.$router.push({
            name: "Login",
          });
        });
    },
    cancellation() {
      let isToken = localStorage.getItem("TOKEN");
      Dialog.confirm({
        title: "注销账号",
        message: "是否确定注销账号，一旦注销无法恢复！",
      })
        .then(() => {
          res.request({
            url: "/destroyAccount",
            method: "post",
            data: {
              tokenString: isToken,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.safe {
  position: relative;
  .head {
  }
  .bg {
    height: 150px;
    width: 100%;
    background: #0c34ba;
  }
  .content {
    width: 100%;
    position: absolute;
    top: 160px;
    padding-top: 20px;
    .button {
      margin-top: 60px;
      padding: 20px;
    }
  }
}
</style>