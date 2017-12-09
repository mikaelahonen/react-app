import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';

class Loading extends React.Component {
	render() {
		return (
      <FontAwesome name="circle-o-notch" size="3x" spin/>
		);
	}
}

export default Loading;
