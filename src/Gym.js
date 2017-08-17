import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom'
//Gym components
import GymHome from './GymHome'
import GenericList from './GenericList'
import GymWorkout from './GymWorkout'
import GymSets from './GymSets'


class Gym extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/gym' component={GymHome}/>
					<Route exact path='/gym/workouts' component={GenericList}/>
					<Route exact path='/gym/sets' component={GenericList}/>
					<Route exact path='/gym/excercises' component={GenericList}/>
					<Route exact path='/gym/musclegroups' component={GenericList}/>
					<Route exact path='/gym/workouts/:id' component={GymWorkout}/>
				</Switch>
			</div>
		);
	}
}

export default Gym;