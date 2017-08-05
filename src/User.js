import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom'
//Gym components
import UserHome from './User'


class User extends Component {
  render() {
    return (
		<Switch>
			<Route exact path='/user' component={UserHome}/>
				{/*<Route path='/user/logout' component={UserLogout}/>*/}
				{/*Route path='/user/login' component={UserLogin}/>*/}
		</Switch>
	);
  }
}

export default User;