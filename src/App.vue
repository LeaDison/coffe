<template>
  <div id="app">
    <router-view :myInfo="myInfo" :isLogin="isLogin" @updateMyInfo="getMyInfo"/>
  </div>
</template>


<script>
  import res from "./request/request";
export default {
  data(){
    return{
      myInfo:{},
      isLogin:false
    };
  },
  created(){
    this.getMyInfo();
  },
  methods:{
    getMyInfo(){
      let token = localStorage.getItem("TOKEN") || "";
      if(!token){
        return;
      }
      res.request({
        url:"/findMy",
        params:{
          tokenString:this.$token
        }
      }).then(data=>{
        res.request({
          url:"/findAccountInfo",
          params:{
            tokenString:this.$token
          }
        }).then(result=>{
          let obj ={
            ...data[0],
            ...result[0]
          };
          console.log("信息合并");
          this.myInfo=obj;
          this.isLogin=true;
        })
      })
    }
  }
}
</script>
<style lang="less" >
html{
  font-size: 15px;
}
// img {
//   width: 100%;
//   height: auto;
//   display: block;
// }
.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
