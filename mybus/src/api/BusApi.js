import axios from "axios";
import * as URLs from '../const'
// https://test2312.herokuapp.com/
const busApiUrl = "http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList" //버스위치정보
const bustRouteApiUrl = "http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList" //버스노선정보
const busArrivalApiUrl = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem"
const serviceKey = "L%2F1NA9bpn1I%2FXr0C2YPtJGNnZXPyrz3O7o3Hvn8ALqFO9DA40GocvMWlaoq6ofkUhaUTcoGKXmTLhkmTz3bVuA%3D%3D"
const routeId = "232000089" // 김포 90-1번
const stationId = "168000413" //마전역
const instance = axios.create({
  baseURL : `${busApiUrl}?serviceKey=${serviceKey}&routeId=${routeId}`
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
      url:"/api/test",
      method:"get",
    })
  },

  getBusData() {
    return instance({
      url:"/api/busData",
      method:"get"
    })
  },
  getBusRouteData() {
    return instance({
      url:"/api/busRoute",
      method:"get"
    })
  },
  getBusArrivalData() {
    return instance({
      url:"/api/busArrival",
      method:"get"
    })
  }

}