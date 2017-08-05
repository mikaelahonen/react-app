import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
  render() {
	delete localStorage.token;
    return (
		<Redirect to="/"/>
	);
  }
}

export default Logout;