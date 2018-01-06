import React, { Component } from 'react';

const Plotly = window.Plotly

class Plot extends React.Component {

  componentDidMount(){
    var data = [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }
    ];

    Plotly.newPlot('plot', data);
  }
  render () {
    return (
      <div id="plot"></div>
    )
  }
}

export default Plot;
