 //React
import React, { Component } from 'react';
import 'css/style.css';
//Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom';
//Components
import MenuPrivate from 'private/Menu';
import Home from 'private/Home';
import Gym from 'private/gym/Gym';
import User from 'private/user/User';

class AppPrivate extends Component {
	
	render() {
		return (
			<div>
				<MenuPrivate/>			
				<Grid id="container">
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

export default AppPrivate;
