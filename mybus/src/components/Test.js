import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BusApi from '../api/BusApi';
//import Main from './Main';

const Test = () => {

  const [busLocationData, setBusLocationData] = useState(null);
  
  useEffect(() => {
    console.log("Test useEffect...")
    busLocationInfo();
  },[])

  const busLocationInfo = async () => {
    const busData = await BusApi.getBusData();
    const busDataProcessing = busData.data.elements[0].elements[2].elements
    console.log("버스 실시간 조회 ===>", busData);
    // setBusLocationData(busData.data.elements[0].elements[2].elements);
    // console.log("버스 실시간 조회 데이터 가공전===>",busDataProcessing);
     console.log("버스 실시간 조회 데이터 가공===>",busDataProcessing.map((data) => data.elements.map((data)=> data.elements.map((data) => data.text))));
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
