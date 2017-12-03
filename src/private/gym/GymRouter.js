import React, { Component } from 'react';
import {ButtonToolbar, Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom'
//Gym components
import GymHome from 'private/gym/GymHome'
//import GenericList from 'components/GenericList'
import GymWorkouts from 'private/gym/GymWorkouts'
import GymWorkout from 'private/gym/GymWorkout'
import GymWorkoutEdit from 'private/gym/GymWorkoutEdit'
import GymSets from 'private/gym/GymSets'
//import GymSet from 'private/gym/GymSet'
import GymSetEdit from 'private/gym/GymSetEdit'
import GymExcercise from 'private/gym/GymExcercise'
import GymRoutines from 'private/gym/GymRoutines'


class GymRouter extends Component {
	render() {
		return (
			<Row>
				<Col xs={12}>

					<ButtonToolbar>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/workouts')}>Workouts</Button>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/sets')}>Sets</Button>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/excercises')}>Excercises</Button>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/musclegroups')}>Muscle Groups</Button>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/plans')}>Plans</Button>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/routines')}>Routines</Button>
						<Button bsSize="lg" onClick={() => this.props.history.push('/gym/sections')}>Sections</Button>
					</ButtonToolbar>
					
					<hr/>
					
					<Switch>
						<Route exact path='/gym/workouts' component={GymWorkouts}/>
						<Route exact path='/gym/workouts/:id/edit' component={GymWorkoutEdit}/>
						<Route exact path='/gym/workouts/:id' component={GymWorkout}/>
						<Route exact path='/gym/excercises/:id' component={GymExcercise}/>
						<Route exact path='/gym/sets' component={GymSets}/>
						<Route exact path='/gym/sets/:id/edit' component={GymSetEdit}/>
						<Route exact path='/gym/routines' component={GymRoutines}/>
						{/*<Route exact path='/gym/sets/:id' component={GymSet}/>*/}
						

						<Route exact path='/gym' component={GymHome}/>
					</Switch>
				</Col>
			</Row>
		);
	}
}

export default GymRouter;