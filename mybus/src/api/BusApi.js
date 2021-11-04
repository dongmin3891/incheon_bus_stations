import axios from "axios";
import * as URLs from '../const'

const instance = axios.create({
  baseURL : `${URLs.busApiUrl}
  serviceKey=${URLs.serviceKey}
  numOfRows=${URLs.numOfRows}
  pageNo=${URLs.pageNo}
  routeid=${URLs.routeId}`,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //에러코드 처리
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error)
  }
)



export default {
  getTest() {
    return instance({
      url:"",
      method:"get",
    })
  }
}