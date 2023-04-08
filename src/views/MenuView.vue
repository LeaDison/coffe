<template>
  <div class="menu">
    <div class="headsearch">
      <van-search shape="round" disabled placeholder="输入商品名称" />
    </div>
    <div class="tab">
      <van-tabs
        swipeable
        v-model="active"
        swipe-threshold="4"
        line-height="0px"
        title-active-color="#062dda"
        @click="onClick"
      >
        <van-tab v-for="(item, index) in tablist" :key="index">
          <template #title>
            <div class="type-img">
              <img
                :src="active == index ? item.icon.active : item.icon.inactive"
                alt=""
              />
            </div>
            {{ item.typeDesc }}
          </template>

          <div class="content">
            <div class="content-list" v-for="(item,index) in proList" :key="index">
              <div class="content-left">
                <div class="content-img">
                  <img :src="item.smallImg" alt="" class="c-img">
                </div>
                <div class="content-name">
                  <div class="content-zh-name">
                    {{ item.name }}
                  </div>
                  <div class="content-en-name one-txt">
                    {{ item.enname }}
                  </div>
                  <div class="content-price">
                    ￥{{ item.price }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import res from "../request/request";
export default {
  data() {
    return {
      tablist: [],
      active: 0,
      icondata: [
        {
          icon:{
                active:require("../assets/icon/icons_02.png"),
                inactive:require("../assets/icon/icons_01.png")
            },
          key: "isHot",
        },
        {
          icon:{
                active:require("../assets/icon/icons_04.png"),
                inactive:require("../assets/icon/icons_03.png")
            },
          key: "type",
        },
        {
          icon:{
                active:require("../assets/icon/icons_06.png"),
                inactive:require("../assets/icon/icons_05.png")
            },
          key: "type",
        },
        {
          icon:{
                active:require("../assets/icon/icons_08.png"),
                inactive:require("../assets/icon/icons_07.png")
            },
          key: "type",
        },
        {
          icon:{
                active:require("../assets/icon/icons_10.png"),
                inactive:require("../assets/icon/icons_09.png")
            },
          key: "type",
        },
      ],
      proList:[],
    };
  },
  created() {
    this.gettablist();
    this.$watch(
    () => this.icondata[0].icon.active,
    function(val, old) {
      console.log(val,old);
    }
  )

  },
  
  methods: {
    gettablist() {
      res
        .request({
          url: "/type",
        })
        .then((data) => {
          let hot = {
            id: 0,
            type: "1",
            typeDesc: "推荐",
          };
          data.unshift(hot);
          let arr = [];
          let obj = {};
          data.forEach((item, index) => {
            obj = {
              ...item,
              ...this.icondata[index],
            };
            arr.push(obj);
          });
          this.tablist = arr;
          // this.onClick(0);
        });
    },
    onClick(index) {
      res
        .request({
          url: "/typeProducts",
          params: {
            key: this.tablist[index].key,
            value: this.tablist[index].type,
          },
        })
        .then((data) => {
          this.proList=data;
        });
    },
  },
  watch:{
    tablist(){
      this.$nextTick(()=>{
        this.onClick(0);
      })
    }
  }
};

</script>

<style lang="less" scoped>
.menu {
  ::-webkit-scrollbar{
    display: none;
  }
  /deep/.van-search__content {
    background: #e9e9e9;
  }
  background: #fff;
  .tab {
    font-size: 14px;

    height: 80px;
    /deep/.van-tabs--line .van-tabs__wrap {
      height: 80px;
      text-align: center;
    }
    .img {
      width: 40px;
    }
    /deep/.van-tab {
      flex: 0 0 25%;
    }
    /deep/.van-tab__text {
      font-weight: 600;
    }
    .content{
      height: calc(100vh - 184px);
      background: #f7f7ff;
      padding: 12px;
      overflow-y: scroll;
      box-sizing: border-box;
      .content-list{
        background: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-child{
          margin-bottom: 0px;
        }
        .content-left{
          display: flex;
          align-items: center;
          .content-img{
            width: 90px;
            .c-img{
              height: 90px;
            }
          }
          .content-name{
            margin: 10px;
            color: #646566;
            .content-en-name{
              margin-top: 5px;
              width: 150px;
            }
          }
        }
        .content-price{
          font-weight: 600;
          color: #0a34b8;
        }
      }
    }
  }
}
</style>