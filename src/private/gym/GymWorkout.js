import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {
	
	state = {
		ready: false,
		workout: {},
		sets: {},
		excercises: {},
		musclegroups: {},
		activeExcerciseId: null,
		excerciseFilter: null,
	}	
	
	//Filter to excercises of clicked object
	handleRowClick(clickedSetId, event){
		
		var sets = this.state.sets;
		var filterId = sets.filter(set => clickedSetId == set.id)[0].excercise;
		console.log('click: ' + clickedSetId);
		console.log('filter: ' + filterId);
		this.setState({
			excerciseFilter: filterId
		});
	}
	
	handleShowAll(event){
		this.setState({
			excerciseFilter: null,
		});
	}
	
	renderWorkout(workout){
		var item = 
			<Panel>
				<h2>{workout.name}</h2>
				<p>Id: {workout.id}</p>
				<p>Start time: {workout.start_time}</p>
				<p>End time: {workout.end_time}</p>
				<p>Location: {workout.location}</p>
				<p>Sets: {workout.sets.length}</p>
			</Panel>
		return item;
	}
	
	renderToolbar(){
		var toolbar = 
			<div>
				<ButtonToolbar onClick={(event) => this.handleShowAll(event)}>
					<Button >
						Show all
					</Button>
				</ButtonToolbar>
			</div>
		return toolbar;
	}
	
	renderSets(sets){

		//Initiate row items
		var items = [];
		
		sets.map((set, index) => {
			
			//Filter excercises			
			if(!this.state.excerciseFilter || set.excercise == this.state.excerciseFilter){					
				
				//Style done sets with green
				var doneStyle = {}
				if(set.done){
					doneStyle = {backgroundColor: '#c6efce'}
				}
				
				//Set an icon to currently active sets
				var activeIcon = ""
				if(set.id == this.state.workout.active_set){
					activeIcon = <FontAwesome name="cog" spin/>;
				}
				
				var excerciseStyle = {}
				/*if(set.excercise == this.state.activeExcerciseId){
					excerciseStyle = {fontWeight: 'bold'}
				}*/
				
				var btnUpdate = 
					<LinkContainer to={'/gym/sets/' + set.id + '/edit'}>
						<Button bsStyle="primary">
							<FontAwesome name="pencil"/>
						</Button>
					</LinkContainer>

				var btnAnalytics = 
					<LinkContainer to={'/gym/excercises/' + set.excercise + '/analytics'}>
						<Button bsStyle="primary">
							<FontAwesome name="line-chart"/>
						</Button>
					</LinkContainer>				
				
				var item = 
					<tr key={index} style={doneStyle} onClick={(event) => this.handleRowClick(set.id, event)}>
						<td style={excerciseStyle}>{set.excercise_name} ({set.muscle_group_name}) {activeIcon}</td>
						<td><pre>{set.reps + " x " + set.weight}kg</pre></td>
						<td>{set.one_rep_max}kg</td>
						<td>{btnUpdate}</td>
						<td>{btnAnalytics}</td>
					</tr>
					
				//Add row item to array
				items.push(item);
			}
			
			
		});
		
		return( 
			<Table responsive>
				<thead>
					<tr>
						<th>Excercise</th>
						<th>Reps x Weight</th>
						<th>Theoretical max</th>
						<th>Start</th>
						<th>Analytics</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</Table>);
	}
	
	componentWillMount(){
		console.log('will mount');
		this.setState({
			id: this.props.match.params.id
		});
	}
	
	
	componentWillReceiveProps(nextProps){
		var workoutId = nextProps.match.params.id;
		this.setState({
			ready: false,
			workoutId: workoutId,
		});
		this.getAsd(workoutId);
	}
	
	componentDidMount(){
		var workoutId = this.props.match.params.id
		this.getAsd(workoutId);
	}
	
	getAsd(workoutId){		
		var workout_promise = getData('/gym/workouts/' + workoutId + '/');
		var sets_promise = getData('/gym/sets/?workout=' + workoutId);	
		Promise.all([workout_promise, sets_promise]).then(resolved => {
			
			
			
			//Workouts and sets from promises
			var workout = resolved[0];
			var sets = resolved[1];	

			//Get active excercise
			var activeExcerciseId = sets.filter(set => set.id == workout.active_set)[0].excercise;
			
			//Set state
			this.setState({
				workout: workout,
				sets: sets,
				activeExcerciseId: activeExcerciseId,
				ready: true,
			});
			
		});
	}

	render() {
		
		if(this.state.ready){
			var wait = "";
			var workout = this.renderWorkout(this.state.workout);
			var filter = this.renderToolbar();
			var sets = this.renderSets(this.state.sets);
			var chart = <div><hr/><p>[CHART OF ACTIVE SET]</p></div>;
		}else{
			wait = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}

		
		
		return (			
		  <div>			
			<Row>
				<Col md={12}>
					{wait}
					{workout}
					{filter}
					{sets}
					{chart}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkout;