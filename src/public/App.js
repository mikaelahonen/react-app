import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom';
//Import public apps
import MenuPublic from 'public/Menu';
import Scores from 'public/scores/Scores';
import Colors from 'public/colors/Colors';
import Home from 'public/Home';

class AppPublic extends Component {
  render() {
    return (
			<div>
				<MenuPublic/>			
				
					<Switch>
						<Route exact path='/public/' component={Home}/>
						<Route path='/public/scores' component={Scores}/>
						<Route path='/public/colors' component={Colors}/>
					</Switch>

			</div>

	);
  }
}

export default AppPublic;