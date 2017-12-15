import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table, ProgressBar} from 'react-bootstrap';
import {getData, patchData, deleteData} from 'functions/Api';
import {distinctValues, utcToDate} from 'functions/Functions';
import {Loading, TableFrame, TableRow, Btn} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {

	state = {
		ready: false,
		workout: {},
		sets: {},
		excerciseFilter: null,
	}

	//Filter to excercises of clicked object
	handleFilter(clickedSetId, event){
		var sets = this.state.sets;
		var filterId = sets.filter(set => clickedSetId == set.id)[0].excercise;
		this.setState({
			excerciseFilter: filterId
		});
	}

	//Mark set as done
	handleDelete(setId, event){
		var ans  = window.confirm('Are you sure you want to delete this set?')
		if (ans) {
			var endpoint = '/gym/sets/' + setId + '/';
			deleteData(endpoint).then(response => {
				this.props.history.push();
			});
		}
	}

	//Mark set as done
	handleAnalytics(excerciseId, event){
			this.props.history.push('/gym/excercises/' + excerciseId);
	}

	handleShowAll(event){
		var state = {excerciseFilter: null};
		this.setState(state);
	}

	renderWorkout(){
		var workout = this.state.workout;
		return (
			<Panel>
				<h2>{workout.name}</h2>
				<p>Id: {workout.id}</p>
				<p>Start time: {utcToDate(workout.start_time)}</p>
				<p>End time: {utcToDate(workout.end_time)}</p>
				<p>Location: {workout.location}</p>
				<p>Sets: {workout.sets_total}</p>
			</Panel>
		);
	}

	renderToolbar(){
		return (
			<ButtonToolbar>
				<Btn text="Show all" onClick={(event) => this.handleShowAll(event)} />
				<Btn bsStyle="success" icon="plus" to="/gym/sets/add" />
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

	renderSets(){

		//Initiate row items
		var items = [];

		this.state.sets.map((set, index) => {

			//Filter excercises
			if(!this.state.excerciseFilter || set.excercise == this.state.excerciseFilter){

				var remove = <FontAwesome name='trash'
					onClick={(event) => this.handleDelete(set.id, event)} />

				var analytics =	<FontAwesome name="area-chart"
					onClick={(event) => this.handleAnalytics(set.excercise, event)} />

				var filter = <FontAwesome name="filter"
					onClick={(event) => this.handleFilter(set.id, event)}/>

				var setLink = '/gym/sets/' + set.id + '/edit';
				var excerciseName = set.excercise_name + " (" + set.muscle_group_name + ")";
				var excercise = <Link to={setLink}>{excerciseName}</Link>

				var values = [
						set.workout_order,
						excercise,
						set.reps + " x " + set.weight + (!set.weight ? '' : ' kg'),
						set.one_rep_max + (!set.weight ? '' : ' kg'),
						filter,
						analytics,
						remove,
				]

				//<tr key={index}  >
				var item = <TableRow
					key={index}
					values={values}
					style={set.done ? {backgroundColor: '#c6efce'} : undefined}
				/>

				//Add row item to array
				items.push(item);

			} //end if

		}); //end map

		return items

	} //End function

	componentWillMount(){
		this.getAll();
	}


	getAll(){
		var workoutId = this.props.match.params.id;
		var workout_promise = getData('/gym/workouts/' + workoutId + '/');
		var sets_promise = getData('/gym/sets/?workout=' + workoutId);

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

		});
	}

	render() {

		var wait = <Loading/>;
		var workout = "";
		var sets = [];
		var progressBar = "";

		var heads = ["#","Excercise","Set","1 Max",""];

		if(this.state.ready){
			wait = "";
			workout = this.renderWorkout();
			sets = this.renderSets();
			progressBar = this.renderProgressBar();
		}

		return (
		  <div>
			<Row>
				<Col md={12}>
					{wait}
					{workout}
					{progressBar}
					{this.renderToolbar()}
					<TableFrame heads={heads} rows={sets} />
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkout;
