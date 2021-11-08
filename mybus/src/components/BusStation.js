import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BusApi from '../api/BusApi';
//import Main from './Main';

const BusStation = () => {

  const [busLocation, setBusLocation] = useState(null);
  const [busRoute, setBusRoute] = useState(null);
  const [stationId, setStationId] = useState(null);
  
  useEffect(() => {
    console.log("Test useEffect...")
      busLocationInfo();
      busRouteInfo();
      busArrivalInfo();
  },[])

  //현재버스위치조회
  const busLocationInfo = async () => {
    const busData = await BusApi.getBusData();
    const busDataProcessing = busData.data.elements[0].elements[2].elements
    const stationId = busDataProcessing.map((data) => data.elements
    .filter((data) => data.name === "stationId" )
    .map((data) => data.elements
    .map((data)=>data.text)))
    
    // setBusLocationData(busData.data.elements[0].elements[2].elements);
    // console.log("버스 실시간 조회 데이터 가공전===>",busDataProcessing);

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

    console.log("버스 실시간 조회 데이터 가공===>",busDataProcessing.map((data) => data.elements.map((data)=> data.elements.map((data) => data.text))));
    console.log("현재 stationId 조회", String(stationId.join([])));
    //  console.log("버스 실시간 조회 데이터 가공2===>",busDataProcessing.map((data) => data.elements));
    setStationId(String(stationId.join("")))
  }
  //경유정류소목록조회
  const busRouteInfo = async () => {
    const busRouteData = await BusApi.getBusRouteData();
    const busRouteDataProcessing = busRouteData.data.elements[0].elements[2].elements
    console.log("버스노선조회", busRouteDataProcessing)
    
    const stationNameId = busRouteDataProcessing
    .map((data) => data.elements
    .filter((data) => data.name === "stationName" || data.name === "stationId" )
    .map((data) => data.elements
    .map((data)=>data.text)))

    // const stationId = stationName.push(busRouteDataProcessing
    //   .map((data) => data.elements
    //   .filter((data) => data.name === "stationId")
    //   .map((data) => data.elements
    //   .map((data)=>data.text))))

    // setBusRoute(busRouteDataProcessing
    //   .map((data) => data.elements
    //   .filter((data) => data.name === "stationName")
    //   .map((data) => data.elements
    //   .map((data)=>data.text))))
    
    setBusRoute(stationNameId);
    /*

    */
  }

  const busArrivalInfo = async () => {
    const busArrivalData = await BusApi.getBusArrivalData();
    console.log("버스도착정보조회", busArrivalData);
  }

  //새로고침
  const reFresh = () => {
    busLocationInfo();
    busRouteInfo();
  }


 

  return (
    <>
      <div className="test">
      <button onClick={reFresh}>새로고침</button>
        <ul className="">
          {busRoute?.map((data,index) =>
            <>
              {console.log("zxc",data[0].join(""))} 
              <li key={index} style={{...stationId.indexOf(String(data[0])) !== -1 ? {color : "red"} : {color : "black"}}} name={data[1]} value={data[0]}>{data[1]}</li>
            </>
          )}
        </ul>
        
      </div>
    </>
  );
}

export default BusStation;
