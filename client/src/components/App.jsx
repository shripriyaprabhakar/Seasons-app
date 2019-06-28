import React, { Component, useEffect, useState } from "react";

import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

const App = () => {
  const [lat, setLat] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = position.coords.latitude;
          console.log(pos);
          setLat(pos);
        },
        error => {
          setErrorMessage(error.message);
        },
        { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
      );
    }
  }, []);

  const fn = () => {};

  let content;
  if (errorMessage) {
    content = <div className="">Error: {errorMessage}</div>;
  } else if (lat) {
    content = <SeasonDisplay lat={lat} />;
  } else {
    content = <Spinner message="Please Accept Location" />;
  }
  return <div>{this.renderContent()}</div>;
};

export default App;
