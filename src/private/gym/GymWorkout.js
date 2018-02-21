import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, ProgressBar} from 'react-bootstrap';
import {getData, patchData, deleteData} from 'functions/Api';
import {distinctValues, utcToDate, groupBy} from 'functions/Functions';
import {Loading, Btn, MainTitle, FormInput} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import{connect} from 'react-redux'
import * as workoutActions from 'actions/workoutActions';
import GymWorkoutListMobile from './GymWorkoutListMobile';
import GymWorkoutQuickView from './GymWorkoutQuickView';
import * as moment from 'moment';
import 'moment-duration-format';

class WorkoutClass extends React.Component {

	state = {
		ready: false,
		workout: {},
		sets: {},
		timer: undefined,
		ticks: 0,
	}

	handleWorkoutEdit(){
		this.props.history.push('/gym/workouts/' + this.props.match.params.id + '/edit');
	}

	handleWorkoutDelete(){
		window.alert('Delete workout. Not implemented.');
	}

	handleSetAdd(){
		this.props.history.push('/gym/sets/add');
	}



	handleChangeView(view, event){
		var state = {view: view};
		this.setState(state);
	}


	handleShowAll(event){
		var state = {excerciseFilter: null};
		this.setState(state);
	}


	tick(){
		//Difference
		var start = moment(this.props.workout.workout.start_time);
		var now = moment()
		var ms = now.diff(start)

		//String timer
		var duration = moment.duration(ms);
		var timer = duration.format('hh:mm:ss');

		//Set state
		var newState = {timer: timer}
		this.setState(newState)

		return true
	}

	renderToolbar(){
		return (
			<ButtonToolbar>
				<Btn text="Show all" onClick={() => this.props.excerciseFilter(undefined)} />
				<Btn text="Quick" onClick={() => this.props.setView("quick")} />
				<Btn text="Mobile" onClick={() => this.props.setView("mobile")} />
				<Btn text="Desktop" onClick={() => this.props.setView("desktop")} />
			</ButtonToolbar>
		);
	}

	renderProgressBar(){
		var done = this.state.workout.sets_done
		var total = this.state.workout.sets_total
		var percent = done/total*100
		return(
			<ProgressBar now={percent} label={done + "/" + total} bsStyle="success" />
		)
	}


	componentWillMount(){
		this.getAll();
	}

	getAll(){
		var workoutId = this.props.match.params.id;
		var workout_promise = getData('/gym/workouts/' + workoutId + '/');
		var sets_promise = getData('/gym/sets/?workout=' + workoutId + '&ordering=workout_order');

		Promise.all([workout_promise, sets_promise]).then(resolved => {

			//Workouts and sets from promises
			var workout = resolved[0];
			var sets = resolved[1];

			var state = {
				workout: workout,
				sets: sets,
				ready: true,
				excerciseFilter: null,
			}

			//Set state
			this.setState(state);

			//To global state
			this.props.setSets(sets);
			this.props.setWorkout(workout);

		});
	}

	componentDidMount(){
		//Loop timer once per second
		this.interval = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {

		var workout = "Workout...";
		var progressBar = "";
		var duration = "mm:ss";
		var view = "Rendering view...";
		var modal = "";

		if(this.state.ready){

			//Change: Render only, if workout is undone
			duration = <div className="duration">{this.state.timer}</div>
			progressBar = this.renderProgressBar();
			workout = this.state.workout.name;

			//View
			if(this.props.workout.view=="mobile"){
				view = <GymWorkoutListMobile />;
			}else if(this.props.workout.view=="quick"){
				view = <GymWorkoutQuickView />;
			}

		}

		var menuItems = [
			{
				text: 'Edit workout',
				onClick: () => this.handleWorkoutEdit(),
			},
			{
				text: 'Delete workout',
				onClick: () => this.handleWorkoutDelete(),
			},
			{
				text: 'Add set',
				onClick: () => this.handleSetAdd(),
			}

		]

		return (
			<Row>
				<Col md={12}>
					<MainTitle title={workout} menuItems={menuItems} />
					{duration}
					{progressBar}
					{this.renderToolbar()}
					{view}

				</Col>
			</Row>
		)
	}
}

// Maps state from store to props
// To fetch data from Redux store
function mapStateToProps(state, ownProps){
  return {
    // You can now say this.props.workout
    workout: state.workout
  }
}

// Maps actions to props
// To send data to Redux store
function mapDispatchToProps(dispatch){
  return {
  // You can now say this.props.setView
		setSets: (sets) => dispatch(workoutActions.setSets(sets)),
		setWorkout: (workout) => dispatch(workoutActions.setWorkout(workout)),
		setView: (view) => dispatch(workoutActions.setView(view)),
		excerciseFilter: (excerciseId) => dispatch(workoutActions.excerciseFilter(excerciseId)),

  }
};

const WorkoutContainer = connect(mapStateToProps, mapDispatchToProps)(WorkoutClass);

export default WorkoutContainer;
