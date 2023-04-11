import Vue from "vue";
import { Toast } from "vant";
import axios from "axios";

Vue.use(Toast);

let num = 0;
const request = (obj) => {
  //动态键
  let type = obj.method == "post" ? "data" : "params";

  num++;
  const baseUrl = "http://www.kangliuyong.com:10002";
  return new Promise((resolve, reject) => {
    Toast.loading({
      message: "加载中···",
      forbidClick: true,
      duration: 0,
    });

    axios({
      ...obj,
      url: baseUrl + obj.url,
      [type]: {
        ...obj[type],
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
      },
    })
      .then((data) => {
        console.log("请求方法", data);
        //判断post还是get
        if (type == "params") {
          resolve(data.data.result);
        } else if (type == "data") {
          resolve(data.data);
        }
        num--;
        if (num == 0) {
          Toast.clear();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default {
  request,
};
