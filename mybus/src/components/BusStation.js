import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BusApi from '../api/BusApi';
//import Main from './Main';

const BusStation = () => {

  const [busLocation, setBusLocation] = useState(null);
  const [busRoute, setBusRoute] = useState(null);
  const [stationId, setStationId] = useState(null);
  const [arrivalInfo, setArrivalInfo] = useState(null);

  useEffect(() => {
    console.log("Test useEffect...")
      busLocationInfo();
      busRouteInfo();
      busArrivalApi();
      //  버스노선나누는함수();
  },[])

  //현재버스위치조회
  const busLocationInfo = async () => {
    const busData = await BusApi.getBusData();
    const busDataProcessing = busData?.data?.elements[0]?.elements[2]?.elements
    const stationId = busDataProcessing?.map((data) => data.elements
    .filter((data) => data.name === "stationId" )
    .map((data) => data.elements
    .map((data)=>data.text)))

    //김포, 인천 routeId = 232000089
    /******  데이터 순서
      endBus : 막차여부 (0:일반, 1:막차)
      lowPlate : 저상버스여부 (0:일반버스, 1: 저상버스)
      plateNo : 차량번호
      remainSeatCnt : 차량빈자리수 (-1:정보없음, 0~:빈자리 수)
      routeId : 노선 아이디 (노서ID)
      stationId : 정류소 아이디 (정류소ID)
      stationSeq : 정류소 순번 (노선의 정류소 순번)
    *******/

    console.log("버스 실시간 조회 데이터 가공===>",busDataProcessing?.map((data) => data.elements.map((data)=> data.elements.map((data) => data.text))));
    console.log("현재 stationId 조회", String(stationId?.join([])));
    //  console.log("버스 실시간 조회 데이터 가공2===>",busDataProcessing.map((data) => data.elements));
    setStationId(String(stationId?.join("")))
  }
  //경유정류소목록조회
  const busRouteInfo = async () => {
    const busRouteData = await BusApi.getBusRouteData();
    const busRouteDataProcessing = busRouteData.data.elements[0]?.elements[2].elements
    console.log("버스노선조회", busRouteDataProcessing)
    
    const stationNameId = busRouteDataProcessing
    .map((data) => data.elements
    .filter((data) => data.name === "stationName" || data.name === "stationId" )
    .map((data) => data.elements
    .map((data)=>data.text)))

    setBusRoute(stationNameId);
    버스노선나누는함수();
  }

  const busArrivalApi = async () => {
    const busArrivalData = await BusApi.getBusArrivalData();
    const busArrivalDataProcessing = busArrivalData.data?.elements[0].elements[2]?.elements

    const busArrivalInfo = busArrivalDataProcessing
    ?.map((data) => data.elements
    .filter((data) => data.name === "flag" || data.name === "locationNo1" || data.name === "locationNo2" || data.name === "predictTime1" || data.name === "predictTime2" )
    .map((data) => data.elements
    .map((data)=>data.text)))

    //console.log("버스도착정보조회", busArrivalDataProcessing);
    // console.log("버스도착정보조회 데이터 가공===>",busArrivalDataProcessing.map((data) => data.elements.map((data)=> data.elements.map((data) => data.text))));
    console.log("버스도착정보조회 필요한 것만 추출", busArrivalInfo);
    
    
    setArrivalInfo(busArrivalInfo);

    /******  데이터 순서
      -flag : 상태구분 (RUN:운행중, PASS:운행중, STOP:운행종료, WAIT:회차지대기)
      -locationNo1 : 첫번째차량 위치정보 (현재 버스위치 -- 몇번째전 정류소)
      -locationNo2 : 두번째차량 위치정보 (현재 버스위치 -- 몇번째전 정류소)
      lowPlate1 : 첫번째차량 저상버스여부 (0:일반버스,1:저상버스)
      lowPlate2 : 두번째차량 저상버스여부 (0:일반버스,1:저상버스)
      -*plateNo1 : 첫번째 차량번호 (차량번호)
      -*plateNo2 : 두번째 차량번호 (차량번호)
      -predictTime1 : 첫번째차량 도착예상시간 (버스도착예정시간 -- 몇분 후 도착예정)
      -predictTime2 : 두번째차량 도착예상시간 (버스도착예정시간 -- 몇분 후 도착예정)
      remainSeatCnt1 : 첫번째차량 빈자리 수 (빈자리수 -- -1:정보없음, 0:빈자리 수)
      remainSeatCnt2 : 두번째차량 빈자리 수 (빈자리수 -- -1:정보없음, 0:빈자리 수)
      -routeId : 노선아이디 (노선ID)
      -staOrder : 정류소 순번 (노선의 정류소순번)
      -stationId : 정유소 아이디 (정류소 ID)
    *******/
  }

  //새로고침
  const reFresh = () => {
    busLocationInfo();
    busRouteInfo();
    // 버스노선나누는함수();
  }

  const 버스노선나누는함수 = () => {
    const list = document.getElementsByClassName("bus_station_list");
    //const list2 = document.querySelector("bus_station_list");
    Array.from(list).forEach(function(data,idx){
      console.log("data",data.name);
      if(data.value === "167000093"){
        //data.innerHTML("전환점입니다.");
      }
    })
    console.log("list",list);
  }
 

  return (
    <>
      <div className="bus_station_main">
        <button className="refresh_button" onClick={reFresh}>새로고침</button>
          <ul className="bus_station_box">
            {busRoute?.map((data,index) =>
              <>
                <li className="bus_station_list" key={index} style={{...stationId?.indexOf(String(data[0])) !== -1 ? {color : "red"} : {color : "black"}}} name={data[1]} value={data[0]}>{data[1]}</li>
              </>
            )}
          </ul>
      </div>
    </>
  );
}

export default BusStation;
