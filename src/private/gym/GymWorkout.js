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
	handleRowClick(clickedSetId, event){
		var sets = this.state.sets;
		var filterId = sets.filter(set => clickedSetId == set.id)[0].excercise;
		this.setState({
			excerciseFilter: filterId
		});
	}

	//Mark set as done
	handleSetClick(setId, event){
		var body = {done: true}
		var endpoint = '/gym/sets/' + setId + '/';
		var redirect = '/gym/sets/' + setId + '/edit';
		patchData(endpoint, body).then(response => {
			this.props.history.push(redirect);
		});
	}

	//Mark set as done
	handleSetDelete(setId, event){
		var ans  = window.confirm('Are you sure you want to delete this set?')
		if (ans) {
			var endpoint = '/gym/sets/' + setId + '/';
			deleteData(endpoint).then(response => {
				this.props.history.push();
			});
		}
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

				//Set an icon to currently active sets
				var activeIcon = ""
				if(set.id == this.state.workout.active_set){
					activeIcon = <FontAwesome name="circle"/>;
				}

				var btnSet = <Btn
					bsStyle={set.done ? 'default' : 'success'}
					onClick={(event) => this.handleSetClick(set.id, event)}
					icon={set.done ? 'pencil' : 'arrow-right'}
					/>

				var btnDelete = <Btn
					onClick={(event) => this.handleSetDelete(set.id, event)}
					icon='trash'
					/>

				var link = '/gym/excercises/' + set.excercise;
				var btnExcercise = <Btn
					to={link}
					icon="area-chart"
				/>

				var values = [
						btnSet,
						set.workout_order,
						set.excercise_name + " (" + set.muscle_group_name + ")",
						set.reps + " x " + set.weight + (!set.weight ? '' : ' kg'),
						set.one_rep_max + (!set.weight ? '' : ' kg'),
						btnExcercise,
						btnDelete,
				]

				//<tr key={index}  >
				var item = <TableRow
					key={index}
				 	onClick={(event) => this.handleRowClick(set.id, event)}
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

		var heads = ["","#","Excercise","Reps x Weight","Theoretical max",""];

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
