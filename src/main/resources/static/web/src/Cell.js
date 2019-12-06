import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { cellState, x, y } = this.props;
    return <div className="cellStyle"></div>;
  }
}

export default Cell;
