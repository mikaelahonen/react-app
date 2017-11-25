import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Jumbotron, Table} from 'react-bootstrap';
import {getData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {
	
	state = {
		readyWorkout: false,
		readySets: false,
		workout: {},
		sets: {},
		excercises: {},
		musclegroups: {},
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
	
	renderSets(sets){
		var items = [];
		sets.map((set, index) => {
			
			var btnUpdate = 
				<LinkContainer to={'/gym/sets/' + set.id + '/edit'}>
					<Button bsStyle="primary">
						<FontAwesome name="edit"/>
					</Button>
				</LinkContainer>

			var btnAnalytics = 
				<LinkContainer to={'/gym/excercises/' + set.excercise + '/analytics'}>
					<Button bsStyle="primary">
						<FontAwesome name="line-chart"/>
					</Button>
				</LinkContainer>				
			
			var item = 
				<tr key={index}>
					<td>{set.excercise_name}</td>
					<td>{set.muscle_group_name}</td>
					<td>{set.id}</td>
					<td>{set.workout_rank}</td>
					<td>{set.reps + " x " + set.weight}</td>
					<td>{btnUpdate}</td>
					<td>{btnAnalytics}</td>
				</tr>
			items.push(item);
		});
		return( 
			<Table striped>
				<thead>
					<tr>
						<th>Excercise</th>
						<th>Muscle Group</th>
						<th>Set id</th>
						<th>Rank</th>
						<th>Reps x Weight</th>
						<th>Edit</th>
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
		this.getWorkout(workoutId);
		this.getSets(workoutId);
	}
	
	componentDidMount(){
		var workoutId = this.props.match.params.id
		this.getWorkout(workoutId);
		this.getSets(workoutId);
	}
	
	getWorkout(workoutId){
		var workout = getData('/gym/workouts/' + workoutId)
		.then((json)=>{
			var workout = json;		
			this.setState({
				workout: workout,
				readyWorkout: true,
			});
		});
	}
	
	getSets(workoutId){
		var sets = getData('/gym/sets/?workout=' + workoutId)
		.then((json)=>{
			var sets = json;
				

			
			this.setState({
				sets: sets,
				readySets: true,
			});
			
		});
	}

	render() {
		
		if(this.state.readyWorkout){
			var workout = this.renderWorkout(this.state.workout);
		}else{
			workout = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}
		
		if(this.state.readySets){
			var sets = this.renderSets(this.state.sets);
			if(sets.length === 0){
				sets = <p>No sets</p>
			}
		}else{
			sets = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}
		
		
		return (			
		  <div>
			<h2>Workout: {this.state.workout.id}</h2>


			<Row>
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/workouts/' + this.state.workout.prev_id}>
							<Button block><FontAwesome name="caret-left" size="2x"/></Button>
						</Link>
					</FormGroup>
				</Col>
				
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/workouts/' + this.state.workout.next_id}>
							<Button block><FontAwesome name="caret-right" size="2x"/></Button>
						</Link>
					</FormGroup>

				</Col>
			</Row>					
			

			<Row>
				<Col md={12}>
					{workout}
					<br/>
					{sets}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkout;