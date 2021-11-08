import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BusApi from '../api/BusApi';
//import Main from './Main';

const Test = () => {

  const [busLocationData, setBusLocationData] = useState(null);
  
  useEffect(() => {
    console.log("Test useEffect...")
    busLocationInfo();
    busRouteInfo();
  },[])

//경유정류소목록조회


  const busLocationInfo = async () => {
    const busData = await BusApi.getBusData();
    const busDataProcessing = busData.data.elements[0].elements[2].elements
    console.log("버스 실시간 조회 ===>", busData);
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
     console.log("버스 실시간 조회 데이터 가공2===>",busDataProcessing.map((data) => data.elements));
  }

  const busRouteInfo = async () => {
    const busRouteData = await BusApi.getBusRouteData();
    console.log("버스 노선 조회 ===>", busRouteData);

    /*
      
    */
  }

  return (
    <>
      <div className="test">
        테스트
        {/* {busLocationData.map((items) => {
          items.map((datas) => {})
        })} */}
      </div>
    </>
  );
}

export default Test;
