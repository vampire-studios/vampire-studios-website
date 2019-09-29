import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="navbar-nav" style={this.textStyle}>
        <h1 className="navbar-text">
          <img src=""></img>
          Vampire Studios
        </h1>
      </div>
    );
  }

  textStyle = {
    color: "#ffffff"
  };
}

export default Header;
