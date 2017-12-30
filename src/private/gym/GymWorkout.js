import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table, ProgressBar} from 'react-bootstrap';
import {getData, patchData, deleteData} from 'functions/Api';
import {distinctValues, utcToDate} from 'functions/Functions';
import {Loading, TableFrame, TableRow, Btn, MainTitle} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {

	state = {
		ready: false,
		workout: {},
		sets: {},
		excerciseFilter: null,
		expandedId: undefined,
	}

	handleWorkoutEdit(){
		window.alert('Edit workout');
	}

	handleWorkoutDelete(){
		window.alert('Delete workout. Not implemented.');
	}

	handleSetAdd(){
		this.props.history.push('/gym/sets/add');
	}

	handleExpand(setId, event){
		var state = {expandedId: undefined}
		if(setId != this.state.expandedId){
			state = {expandedId: setId}
		}
		this.setState(state);
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
	handleEdit(setId, event){
		this.props.history.push('/gym/sets/' + setId + '/edit');
	}

	//Mark set as done
	handleAnalytics(excerciseId, event){
			this.props.history.push('/gym/excercises/' + excerciseId + '/analytics');
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
				<Btn text="Show all" onClick={(event) => this.handleShowAll(event)} />
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

				var status = undefined
				if(set.done){
					status = <FontAwesome style={{color:"#5cb85c"}} name='check' />
				}

				var editLink = '/gym/sets/' + set.id + '/edit';
				var excercise =
					<div>
						<b><Link to={editLink}>{set.excercise_name}</Link></b>
					</div>

				var numbers = <div>{set.reps + " x " + set.weight + (!set.weight ? '' : ' kg')}</div>

				var actions = undefined

				var expand =
					<div className="text-right" onClick={(event) => this.handleExpand(set.id, event)} >
						<FontAwesome  name='chevron-circle-down' />
					</div>

				//Append default values if the row is expanded
				if(this.state.expandedId == set.id){
					excercise =
						<div>
							{excercise}
							<div>
								<i>{set.muscle_group_name}</i>
							</div>
						</div>

					actions =
						<div>
							<div>
								&nbsp;
							</div>
							<div onClick={(event) => this.handleDelete(set.id, event)}>
								<FontAwesome name="trash" /> <i>Delete</i>
							</div>
							<div onClick={(event) => this.handleEdit(set.id, event)}>
								<FontAwesome name="pencil" /> <i>Edit</i>
							</div>
							<div onClick={(event) => this.handleAnalytics(set.excercise, event)}>
								<FontAwesome name="area-chart" /> <i>Analytics</i>
							</div>
							<div onClick={(event) => this.handleFilter(set.id, event)}>
								<FontAwesome name="filter" /> <i>Filter</i>
							</div>
						</div>

					numbers =
						<div>
							{numbers}
							<div>
								<i>{set.orm + " kg"}</i>
							</div>
						</div>
				}

				var values = [
						set.workout_order,
						status,
						excercise,
						numbers,
						actions,
						expand,
				]

				//<tr key={index}  >
				var item = <TableRow
					key={index}
					values={values}
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

		});
	}

	render() {

		var workout = "Workout...";
		var sets = [];
		var progressBar = "";
		var duration = ""

		var heads = ["","","Excercise","Set","",""];

		if(this.state.ready){
			duration = this.renderDuration();
			sets = this.renderSets();
			progressBar = this.renderProgressBar();
			workout = this.state.workout.name
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
					<TableFrame heads={heads} rows={sets} />
				</Col>
			</Row>
		)
	}
}

export default GymWorkout;
