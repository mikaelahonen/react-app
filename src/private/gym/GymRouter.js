import React, { Component } from 'react';
import {ButtonToolbar, Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom'

//Gym components
import GymHome from 'private/gym/GymHome'
//Gym workout
import GymWorkouts from 'private/gym/GymWorkouts'
import GymWorkout from 'private/gym/GymWorkout'
import GymWorkoutEdit from 'private/gym/GymWorkoutEdit'
import GymWorkoutAdd from 'private/gym/GymWorkoutAdd'
//Gym set
import GymSetEdit from 'private/gym/GymSetEdit'
import GymSetAdd from 'private/gym/GymSetAdd'
//Gym excercise
import GymExcerciseAnalytics from 'private/gym/GymExcerciseAnalytics'
import GymExcercises from 'private/gym/GymExcercises'
//Gym routine
import GymRoutines from 'private/gym/GymRoutines'
import GymRoutine from 'private/gym/GymRoutine'
import GymRoutineAdd from 'private/gym/GymRoutineAdd'
import GymRoutineEdit from 'private/gym/GymRoutineEdit'
//Gym section

import ReduxTest from 'private/gym/ReduxTest'
import ReduxTest2 from 'private/gym/ReduxTest2'

class GymRouter extends Component {
	render() {
		return (
			<Row>
				<Col xs={12}>

					<Switch>
						//Workout
						<Route exact path='/gym/workouts' component={GymWorkouts}/>
						<Route exact path='/gym/workouts/:id/edit' component={GymWorkoutEdit}/>
						<Route exact path='/gym/workouts/add' component={GymWorkoutAdd}/>
						<Route exact path='/gym/workouts/:id' component={GymWorkout}/>
						//Set
						<Route exact path='/gym/sets/:id/edit' component={GymSetEdit}/>
						<Route exact path='/gym/sets/add' component={GymSetAdd}/>
						//Excercise
						<Route exact path='/gym/excercises/:id/analytics' component={GymExcerciseAnalytics}/>
						<Route exact path='/gym/excercises' component={GymExcercises}/>
						//Routine
						<Route exact path='/gym/routines' component={GymRoutines}/>
						<Route exact path='/gym/routines/:id' component={GymRoutine}/>
						<Route exact path='/gym/routines/add' component={GymRoutineAdd}/>
						<Route exact path='/gym/routines/:id/edit' component={GymRoutineEdit}/>
						//Section

						//Gym home
						<Route exact path='/gym' component={GymHome}/>

						//Redux test
						<Route exact path='/gym/reduxtest' component={ReduxTest}/>
						<Route exact path='/gym/reduxtest2' component={ReduxTest2}/>

					</Switch>
				</Col>
			</Row>
		);
	}
}

export default GymRouter;
