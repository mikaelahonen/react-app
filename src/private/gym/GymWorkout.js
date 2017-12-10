import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, patchData} from 'functions/Api';
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
				<p>Sets: {workout.sets.length}</p>
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

				var link = '/gym/excercises/' + set.excercise;
				var btnExcercise = <Btn
					to={link}
					icon="line-chart"
				/>

				var values = [
						btnSet,
						set.workout_order,
						set.excercise_name + " (" + set.muscle_group_name + ")",
						set.reps + " x " + set.weight + (!set.weight ? '' : ' kg'),
						set.one_rep_max + (!set.weight ? '' : ' kg'),
						btnExcercise
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

	componentWillReceiveProps(nextProps){
		//var workoutId = nextProps.match.params.id;
		this.setState({ready: false});
		this.getAll();
	}

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
			}

			//Set state
			this.setState(state);

		});
	}

	render() {

		var wait = <Loading/>;
		var workout = "";
		var sets = [];

		var heads = ["","#","Excercise","Reps x Weight","Theoretical max",""];

		if(this.state.ready){
			wait = "";
			workout = this.renderWorkout();
			sets = this.renderSets();
		}

		return (
		  <div>
			<Row>
				<Col md={12}>
					{wait}
					{workout}
					{this.renderToolbar()}
					<TableFrame heads={heads} rows={sets} />
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkout;
