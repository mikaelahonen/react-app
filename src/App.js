 //React
import React, { Component } from 'react';
import './style.css';
//Bootstrap
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom'
//Components
import Menu from './Menu';
import Head from './Components';
import Home from './Home';
import Gym from './Gym';
import User from './User';

class App extends Component {
	
	render() {
		return (
			<div>
			<Menu/>			
				<Grid>
					<Row>
						<Col md={12}>
							<Switch>
								<Route exact path='/' component={Home}/>
								<Route path='/gym' component={Gym}/>
								<Route path='/user' component={User}/>
							</Switch>
						</Col>
					</Row>
				</Grid>
			</div>
    );
  }
}

export default App;
