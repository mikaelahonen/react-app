import React, { Component } from 'react';

class PlotlyTest extends React.Component {

  componentDidMount(){
    var data = [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }
    ];

    window.Plotly.newPlot('myDiv', data);
  }
  render () {
    return (
      <div id="myDiv"></div>
    )
  }
}

export default PlotlyTest;
