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
import GymSets from 'private/gym/GymSets'
import GymSetEdit from 'private/gym/GymSetEdit'
import GymSetAdd from 'private/gym/GymSetAdd'
//Gym excercise
import GymExcercise from 'private/gym/GymExcercise'
//Gym routine
import GymRoutines from 'private/gym/GymRoutines'
import GymRoutine from 'private/gym/GymRoutine'
import GymRoutineAdd from 'private/gym/GymRoutineAdd'
//Gym section
import GymSections from 'private/gym/GymSections'

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
						//Workout
						<Route exact path='/gym/workouts' component={GymWorkouts}/>
						<Route exact path='/gym/workouts/:id/edit' component={GymWorkoutEdit}/>
						<Route exact path='/gym/workouts/add' component={GymWorkoutAdd}/>
						<Route exact path='/gym/workouts/:id' component={GymWorkout}/>
						//Set
						<Route exact path='/gym/sets' component={GymSets}/>
						<Route exact path='/gym/sets/:id/edit' component={GymSetEdit}/>
						<Route exact path='/gym/sets/add' component={GymSetAdd}/>
						//Excercise
						<Route exact path='/gym/excercises/:id' component={GymExcercise}/>
						//Routine
						<Route exact path='/gym/routines' component={GymRoutines}/>
						<Route exact path='/gym/routines/:id' component={GymRoutine}/>
						<Route exact path='/gym/routines/add' component={GymRoutineAdd}/>
						//Section
						<Route exact path='/gym/sections' component={GymSections}/>
						//Gym home
						<Route exact path='/gym' component={GymHome}/>
					</Switch>
				</Col>
			</Row>
		);
	}
}

export default GymRouter;
