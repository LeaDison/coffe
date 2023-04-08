<template>
  <div class="main">
    <keep-alive name="Home,Menu">
      <router-view @toggleEmit="toggle" :myInfo="myInfo" :isLogin="isLogin" />
    </keep-alive>
    <div>
      <van-tabbar v-model="active" active-color="#0c34ba">
        <van-tabbar-item
          v-for="(item, index) in iconData"
          :key="index"
          :to="item.url"
        >
          <span>{{ item.name }}</span>
          <template #icon="props">
            <img :src="props.active ? item.icon.active : item.icon.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>

      <!-- 更换头像 -->
        <!-- 选图，拿地址 -->
        <!-- 发请求上传 -->
        <!-- 反馈结果 -->
        <!-- 上传成功，更新头像 -->

      <!-- 更换昵称 -->
        <!-- 输入框输入昵称 -->
        <!-- 昵称不能为空 -->
        <!-- 输入框失去焦点出现确认弹框，提示是否更新 -->
        <!-- 点击确定，开始上传 -->
        <!-- 反馈成功，更新昵称xx -->

      <!-- 更换简介 -->
        <!-- 输入框输入简介 -->
        <!-- 简介不能为空 -->
        <!-- 输入框失去焦点出现确认弹框，提示是否更新 -->
        <!-- 点击确定，开始上传 -->
        <!-- 反馈成功，更新简介xx -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      iconData: [
        {
          name: "首页",
          icon: {
            active: require("../assets/icon/home_active.png"),
            inactive: require("../assets/icon/home.png"),
          },
          url: "Home",
        },
        {
          name: "菜单",
          icon: {
            active: require("../assets/icon/menu_active.png"),
            inactive: require("../assets/icon/menu.png"),
          },
          url: "Menu",
        },
        {
          name: "购物车",
          icon: {
            active: require("../assets/icon/shopbag_active.png"),
            inactive: require("../assets/icon/shopbag.png"),
          },
          url: "Shopbag",
        },
        {
          name: "我的",
          icon: {
            active: require("../assets/icon/my_active.png"),
            inactive: require("../assets/icon/my.png"),
          },
          url: "My",
        },
      ],
    };
  },
  props: ["myInfo", "isLogin"],
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 自定义事件
      vm.$emit("updateMyInfo");

      if (to.name == "Home") {
        vm.active = 0;
      } else if (to.name == "Menu") {
        vm.active = 1;
      } else if (to.name == "Shopbag") {
        vm.active = 2;
      } else if (to.name == "My") {
        vm.active = 3;
      }
    });
  },
  mounted() {
    this.flash();
  },
  methods: {
    toggle(e) {
      this.active = e;
    },
    flash() {
      if (window.location.href.indexOf("#reloaded") == -1) {
        window.location.href = window.location.href + "#reloaded";
        window.location.reload();
      }
    },
  },
};
</script>

<style lang="less" scoped></style>