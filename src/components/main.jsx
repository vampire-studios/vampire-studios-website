import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div style={this.textStyle}>
        <h1>Hello world!</h1>
      </div>
    );
  }

  textStyle = {
    color: "#ffffff"
  };
}

export default Main;
