import React from "react";
import { Route,Redirect, Switch } from "react-router-dom";
import Test from "./components/Test";






const Main = () => {
  console.log("render")

  return (
    <>
    <div>
      <Route path="/" component={Test} />
    </div>
    </>
  )
}

export default Main;