import React, { Component } from "react";

import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

export default class App extends Component {
  state = {
    lat: null,
    errorMsg: ""
  };

  componentDidMount() {
    this.callFunc();
  }

  callFunc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = position.coords.latitude;
          console.log(pos);
          this.setState({ lat: pos });
        },
        error => {
          // On error code..

          this.setState({ errorMsg: error.message });
        },
        { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
      );
    }
  };
  renderContent = () => {
    if (this.state.errorMsg && !this.state.lat) {
      return <div className="">Error: {this.state.errorMsg}</div>;
    }

    if (!this.state.errorMsg && this.state.lat) {
      return (
        <div className="">
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return <Spinner message="Please Accept Location" />;
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
