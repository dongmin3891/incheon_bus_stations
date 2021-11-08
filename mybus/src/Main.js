import React from "react";
import { Route,Redirect, Switch } from "react-router-dom";
import BusStation from "./components/BusStation";






const Main = () => {
  console.log("render")

  return (
    <>
    <div>
      <Route path="/" component={BusStation} />
    </div>
    </>
  )
}

export default Main;