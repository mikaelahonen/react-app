import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom'
//Gym components
import GymHome from 'private/gym/GymHome'
import GenericList from 'components/GenericList'
import GymWorkouts from 'private/gym/GymWorkouts'
import GymWorkout from 'private/gym/GymWorkout'
import GymWorkoutEdit from 'private/gym/GymWorkoutEdit'
import GymSets from 'private/gym/GymSets'


class GymRouter extends Component {
	render() {
		return (
			<Row>
				<Col xs={12}>
					<Switch>
						<Route exact path='/gym/workouts' component={GymWorkouts}/>
						<Route exact path='/gym/workouts/:id/edit' component={GymWorkoutEdit}/>
						<Route exact path='/gym/workouts/:id' component={GymWorkout}/>
						<Route exact path='/gym/:model/:id/edit' component={GenericList}/>
						<Route exact path='/gym/:model/:id/detail' component={GenericList}/>
						<Route exact path='/gym/:model/add' component={GenericList}/>
						<Route exact path='/gym/:model/:id' component={GenericList}/>						
						
						<Route exact path='/gym/:model' component={GenericList}/>
						<Route exact path='/gym' component={GymHome}/>
					</Switch>
				</Col>
			</Row>
		);
	}
}

export default GymRouter;