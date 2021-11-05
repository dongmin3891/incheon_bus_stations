import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BusApi from '../api/BusApi';
//import Main from './Main';

const Test = () => {
  
  useEffect(() => {
    test();
  },[])

  const test = async () => {
    const testApi2 = await BusApi.getTest();
    const testApi = await BusApi.getBusData();
    console.log("test",testApi)
    console.log("test2",testApi2)
  }


  console.log("render2")
  return (
    <>
      <div className="test">
        가나다라마
      </div>
    </>
  );
}

export default Test;
