import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, patchData} from 'functions/Api';
import {TableFrame, TableRow} from 'components/Components';
import {distinctValues, utcToDate} from 'functions/Functions';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymExcerciseAnalytics extends React.Component {

	state = {
		ready: false,
		excercise: {},
		sets: {},
		workouts_excercises: {},
	}

	renderExcercise(excercise){
		var item =
			<Panel>
				<h2>{excercise.excercise} - {excercise.muscle_group_name}</h2>
				<p>Sets total: {this.state.sets.length}</p>
			</Panel>
		return item;
	}

	renderWorkoutsExcercises(){
		var trows = []
		this.state.workoutsExcercises.map((workoutExcercise, index) => {
			var values = [
				utcToDate(workoutExcercise.date),
				workoutExcercise.set_count,
				workoutExcercise.orm_avg,
				workoutExcercise.orm_max,
			]
			var trow = <TableRow values={values} key={index} />
			trows.push(trow);
		});
		return <TableFrame heads={["Date","Sets","Orm avg","Orm max"]} rows={trows} />
	}

	renderSets(sets){

		//Initiate row items
		var trows = [];

		sets.map((set, index) => {
			var values = [
					utcToDate(set.workout_start_time),
					set.reps,
					set.weight,
					set.orm + (set.weight==0 ? '' : 'kg'),
			]
			var trow = <TableRow values={values} key={index} />
			//Add row item to array
			trows.push(trow);
		});

		return <TableFrame heads={["Date","Reps","Weight","Orm"]} rows={trows} />

	}

	componentWillMount(){
		var id = this.props.match.params.id;
		this.setState({
			id: id,
		});
		this.getAll(id);
	}


	componentWillReceiveProps(nextProps){
		var excerciseId = nextProps.match.params.id;
		this.setState({
			ready: false,
			excerciseId: excerciseId,
		});
		this.getAll(excerciseId);
	}

	/*componentDidMount(){
		var excerciseId = this.props.match.params.id
		this.getAll(excerciseId);
	}*/

	getAll(excerciseId){

		var excercise_promise = getData('/gym/excercises/' + excerciseId + '/');
		//Change to '/gym/sets/?order=workout_order,-workout_date&excercise=' + excerciseId
		//after django api queryset joins are built
		var sets_promise = getData('/gym/sets/?ordering=workout__start_time&excercise=' + excerciseId);
		var workouts_excercises_promise = getData('/gym/workouts/excercises/?excercise=' + excerciseId);

		Promise.all([excercise_promise, sets_promise, workouts_excercises_promise]).then(resolved => {

			//excercises and sets from promises
			var excercise = resolved[0];
			var sets = resolved[1];
			var workoutsExcercises = resolved[2];

			//Get active excercise
			var activeSets = sets.filter(set => set.id == excercise.active_set);
			var activeExcerciseId = undefined;
			activeSets.length == 0 ? activeExcerciseId = null : activeExcerciseId = activeSets[0].excercise;

			//Set state
			this.setState({
				excercise: excercise,
				sets: sets,
				workoutsExcercises: workoutsExcercises,
				activeExcerciseId: activeExcerciseId,
				ready: true,
			});

		});
	}

	render() {

		if(this.state.ready){
			var wait = "";
			var excercise = this.renderExcercise(this.state.excercise);
			var sets = this.renderSets(this.state.sets);
			var workoutsExcercises = this.renderWorkoutsExcercises()
		}else{
			wait = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}



		return (
		  <div>
			<Row>
				<Col md={12}>
					{wait}
					{excercise}
					<h3>By workout</h3>
					{workoutsExcercises}
					<h3>By excercise</h3>
					{sets}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymExcerciseAnalytics;
