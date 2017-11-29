import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, patchData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {
	
	state = {
		ready: false,
		workout: {},
		sets: {},
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
	
	handleClickUpdate(setId, event){
		var body = {done: true}
		var endpoint = '/gym/sets/' + setId + '/';
		var redirect = '/gym/sets/' + setId + '/edit';
		patchData(endpoint, body)
		.then((json)=>{
			this.props.history.push(redirect);
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
				
				//Set an icon to currently active sets
				var activeIcon = ""
				if(set.id == this.state.workout.active_set){
					activeIcon = <FontAwesome name="cog" spin/>;
				}
					
				var btnSet = 
					<Button 
						bsStyle={set.done ? 'default' : 'success'}
						onClick={(event) => this.handleClickUpdate(set.id, event)}
						>
						
						<FontAwesome name={set.done ? 'pencil' : 'arrow-right'}/>
					</Button>

				var btnExcercise = 
					<LinkContainer to={'/gym/excercises/' + set.excercise}>
						<Button bsStyle="default">
							<FontAwesome name="line-chart"/>
						</Button>
					</LinkContainer>				
				
				var item = 
					<tr key={index} style={set.done ? {backgroundColor: '#c6efce'} : undefined} onClick={(event) => this.handleRowClick(set.id, event)}>
						<td>{btnSet}</td>
						<td>{set.workout_order}</td>
						<td>{set.excercise_name} ({set.muscle_group_name}) {activeIcon}</td>
						<td><pre>{set.reps + " x " + set.weight}kg</pre></td>
						<td>{set.one_rep_max}{set.weight==0 ? '' : 'kg'}</td>						
						<td>{btnExcercise}</td>
					</tr>
					
				//Add row item to array
				items.push(item);
			}
			
			
		});
		
		return( 
			<Table responsive>
				<thead>
					<tr>
						<th></th>
						<th>#</th>
						<th>Excercise</th>
						<th>Reps x Weight</th>
						<th>Theoretical max</th>
						<th></th>
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
			var activeSets = sets.filter(set => set.id == workout.active_set);
			var activeExcerciseId = undefined;
			activeSets.length == 0 ? activeExcerciseId = null : activeExcerciseId = activeSets[0].excercise;
			console.log(activeExcerciseId);
			
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
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkout;