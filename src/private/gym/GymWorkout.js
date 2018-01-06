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

class Workout extends React.Component {

	state = {
		ready: false,
		workout: {},
		sets: {},
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


	renderDuration(){
		return (
			<Panel>
				<h3>Duration: [mm:ss]</h3>
			</Panel>
		);
	}

	renderToolbar(){
		return (
			<ButtonToolbar>
				<Btn text="Show all" onClick={() => this.props.excerciseFilter(undefined)} />
				<Btn text="Quick view" onClick={() => this.props.setView("quick")} />
				<Btn text="List view" onClick={() => this.props.setView("list")} />
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

		});
	}

	render() {

		var workout = "Workout...";
		var progressBar = "";
		var duration = "";
		var view = "Rendering view...";
		var modal = "";

		if(this.state.ready){
			duration = this.renderDuration();
			progressBar = this.renderProgressBar();
			workout = this.state.workout.name;

			//View
			if(this.props.workout.view=="list"){
				view = <GymWorkoutListMobile />;
			}else if(this.props.workout.view=="quick"){
				view = <GymWorkoutQuickView />;
			}

			if(this.state.modalOpen){
				modal = this.renderModal();
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
    setView: (view) => dispatch(workoutActions.setView(view)),
		setSets: (sets) => dispatch(workoutActions.setSets(sets)),
		excerciseFilter: (excerciseId) => dispatch(workoutActions.excerciseFilter(excerciseId)),

  }
};

const WorkoutContainer = connect(mapStateToProps, mapDispatchToProps)(Workout);

export default WorkoutContainer;
