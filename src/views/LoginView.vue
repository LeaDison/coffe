<template>
  <div class="login">
    <!-- 头部 -->
    <div class="login-head">
      <div class="head-img">
        <img src="../assets/icon/home_active.png" alt="" />
      </div>
      <div class="head-word">Luckin Coffee</div>
      <div class="to-menu" @click="$router.push('/Menu')">先逛一逛</div>
    </div>
    <!-- 文字 -->
    <h2>欢迎回来！</h2>
    <div class="logintext">Please login to your accounts</div>

    <!-- 表单 -->
    <van-form
      class="login-input"
      @failed="onFailed"
      validate-first
      @submit="loginSubmit"
    >
      <van-field
        v-model="login.phone"
        label="手机号"
        name="loginPhone"
        placeholder="手机号"
        :rules="phone_rule"
      />
      <van-field
        v-model="login.password"
        label="密码"
        name="loginPassword"
        :type="!passwordStatus ? 'password' : 'text'"
        placeholder="密码必须为字母开头"
        :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
        @click-right-icon="passwordStatus = !passwordStatus"
        :rules="password_rule"
      />
      <div class="forget">忘记密码？</div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div style="margin: 50px 25px 16px 25px">
      <van-button
        @click="show = true"
        style="
          color: #000000;
          background-color: #fff;
          border: 1px solid #928d8d;
        "
        class="register-button"
        round
        block
        type="info"
        native-type="submit"
        >注册</van-button
      >
    </div>
    <van-action-sheet v-model="show" title="注册">
      <div class="content">
        <van-form @submit="registerSubmit" @failed="onFailed">
          <van-field
            v-model="register.phone_r"
            name="registerPhone"
            label="手机号"
            placeholder="11位手机号"
            :rules="phone_rule"
          />
          <van-field
            v-model="register.password_r"
            label="密码"
            name="registerPassword"
            :type="!passwordStatus ? 'password' : 'text'"
            placeholder="密码必须为字母开头"
            :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
            @click-right-icon="passwordStatus = !passwordStatus"
            :rules="password_rule"
          />
          <van-field
            v-model="register.username"
            name="registerNickName"
            label="昵称"
            placeholder="昵称"
            :rules="name_rule"
          />
          <div style="margin: 36px 12px 5px 12px">
            <van-button round block type="info" native-type="submit"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>
  
<script>
import res from "../request/request";
export default {
  data() {
    return {
      login: {
        phone: "",
        password: "",
      },
      register: {
        phone_r: "",
        password_r: "",
        username: "",
      },
      passwordStatus: false,
      show: false,
      // name_rule: /^[A-Za-z\u4e00-\u9fa5]{1,5}$/,
      name_rule: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "onBlur",
        },
        {
          pattern: /^[A-Za-z\u4e00-\u9fa5]{1,5}$/,
          message: "用户名格式错误",
          trigger: "onBlur",
        },
      ],

      // password_rule: /^[A-Za-z][A-Za-z\d]{5,15}$/,
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
      // phone_rule: /^1[3-9]\d{9}$/,
      phone_rule: [
        {
          required: true,
          message: "手机号不能为空",
          trigger: "onBlur",
        },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "账号格式错误",
          trigger: "onBlur",
        },
      ],
    };
  },
  methods: {
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    //成功登录的提交
    loginSubmit(val) {
      console.log("提交的登录信息", val);

      res
        .request({
          url: "/login",
          method: "post",
          data: {
            password: val.loginPassword,
            phone: val.loginPhone,
          },
        })
        .then((data) => {
          console.log("登录信息", data);
          if (data.code == 202) {
            this.$toast.fail(data.msg);
          } else if (data.code == 200) {
            this.$toast.success(data.msg);
            //清空输入框
            for (let key in this.login) {
              this.login[key] = "";
            }
            //存储token
            localStorage.setItem("TOKEN", data.token);
            this.goHome();
          }
        });
    },
    goHome() {
      this.$router.push({
        name: "Home",
      });
    },
    registerSubmit(val) {
      console.log("提交的注册信息", val);
      //发送注册请求
      res
        .request({
          url: "/register",
          method: "post",
          data: {
            nickName: val.registerNickName,
            password: val.registerPassword,
            phone: val.registerPhone,
          },
        })
        .then((data) => {
          console.log("注册信息", data);
          if (data.code == 102) {
            this.$toast.fail(data.msg);
          } else if (data.code == 100) {
            this.$toast.success(data.msg);
            for (let key in this.register) {
              this.register[key] = "";
            }
            this.show = false;
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  .login-head {
    display: flex;
    height: 40px;
    border-bottom: 1px solid #e6e0e0;
    padding: 5px;

    .head-img {
      padding-left: 10px;
      line-height: 40px;

      img {
        height: 100%;
      }
    }

    .head-word {
      padding-left: 10px;
      font-weight: 600;
      color: #776f6f;
      line-height: 40px;
    }

    .to-menu {
      padding-left: 128px;
      line-height: 40px;
      font-weight: 600;
      color: #0c34ba;
    }
  }

  h2 {
    padding-top: 40px;
    padding-left: 20px;
    color: #696464;
  }

  .logintext {
    padding: 10px 0px 20px 20px;
    color: #928d8d;
  }

  .login-input {
    padding: 10px;
  }

  .forget {
    text-align: right;
    font-size: 14px;
    color: #928d8d;
    padding: 20px 10px 15px 0px;
  }

  /deep/ .van-button--info {
    background-color: #0c34ba;
  }

  .content {
    padding: 16px 16px 160px;
  }

  /deep/ .van-action-sheet {
    max-height: 45%;
  }

  /deep/ .van-action-sheet__header {
    font-size: 24px;
    font-weight: 600;
    color: #3d3a3a;
    text-align: left;
    padding-left: 30px;
  }
}
</style>