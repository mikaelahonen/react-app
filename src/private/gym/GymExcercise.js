import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, patchData} from 'functions/Api';
import {distinctValues, utcToDate} from 'functions/Functions';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymExcercise extends React.Component {

	state = {ready: false, excercise: {},	sets: {}}

	renderExcercise(excercise){
		var item =
			<Panel>
				<h2>{excercise.excercise} - {excercise.muscle_group_name}</h2>
				<p>Id: {excercise.id}</p>
				<p>Sets total: {this.state.sets.length}</p>
			</Panel>
		return item;
	}

	renderSets(sets){

		//Initiate row items
		var items = [];

		sets.map((set, index) => {
			console.log(set)
			var item =
				<tr key={index}>
					<td>{utcToDate(set.workout_start_time)}</td>
					<td>{set.reps}</td>
					<td>{set.weight}</td>
					<td>{set.orp}{set.weight==0 ? '' : 'kg'}</td>
				</tr>

				//Add row item to array
				items.push(item);
		});

		return(
			<Table responsive>
				<thead>
					<tr>
						<th>Date</th>
						<th>Reps</th>
						<th>Weight</th>
						<th>Theoretical max</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</Table>);
	}

	componentWillMount(){
		this.setState({
			id: this.props.match.params.id
		});
	}


	componentWillReceiveProps(nextProps){
		var excerciseId = nextProps.match.params.id;
		this.setState({
			ready: false,
			excerciseId: excerciseId,
		});
		this.getAll(excerciseId);
	}

	componentDidMount(){
		var excerciseId = this.props.match.params.id
		this.getAll(excerciseId);
	}

	getAll(excerciseId){
		var excercise_promise = getData('/gym/excercises/' + excerciseId + '/');
		//Change to '/gym/sets/?order=workout_order,-workout_date&excercise=' + excerciseId
		//after django api queryset joins are built
		var sets_promise = getData('/gym/sets/?ordering=workout__start_time&excercise=' + excerciseId);
		Promise.all([excercise_promise, sets_promise]).then(resolved => {

			//excercises and sets from promises
			var excercise = resolved[0];
			var sets = resolved[1];

			//Get active excercise
			var activeSets = sets.filter(set => set.id == excercise.active_set);
			var activeExcerciseId = undefined;
			activeSets.length == 0 ? activeExcerciseId = null : activeExcerciseId = activeSets[0].excercise;

			//Set state
			this.setState({
				excercise: excercise,
				sets: sets,
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
		}else{
			wait = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}



		return (
		  <div>
			<Row>
				<Col md={12}>
					{wait}
					{excercise}
					{sets}

				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymExcercise;
