import axios from "axios";

const instance = axios.create({
  baseURL : "",
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

}