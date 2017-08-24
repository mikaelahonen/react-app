import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Jumbotron} from 'react-bootstrap';
import {getData} from 'functions/Api';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {
	
	state = {
		ready: false,
		data: {},
	}	
	
	
	renderWorkout(workout){

		var item = 
			<Jumbotron>
				<h2>{workout.name}</h2>
				<p>Id: {workout.id}</p>
				<p>Start time: {workout.start_time}</p>
				<p>End time: {workout.end_time}</p>
				<p>Location: {workout.location}</p>
			</Jumbotron>

		return item;
	}
	
	renderSets(sets){
		var items = [];
		sets.map((set, index) => {
			var item = 
				<Panel header={set.excercise_obj.excercise} key={index}>
					<p>Id: {set.id}</p>
					<p>Reps: {set.reps}</p>
					<p>Weight: {set.weight}</p>
				</Panel>
			items.push(item);
		});
		return items;
	}
	
	componentWillMount(){
		console.log('will mount');
		this.setState({
			id: this.props.match.params.id
		});
	}
	
	
	componentWillReceiveProps(nextProps){
		var id = nextProps.match.params.id;
		this.setState({
			ready: false,
			id: id,
		});
		this.getWorkout(id);
	}
	
	componentDidMount(){
		var id = this.props.match.params.id
		this.getWorkout(id);
	}
	
	getWorkout(id){
		var data = getData('/gym/workouts/' + id + '/')
		.then((json)=>{
			var data = json;		
			this.setState({
				data: data,
				ready: true,
			});
		});
	}

	render() {
		
		var data = undefined;
		if(this.state.ready){
			var workout = this.renderWorkout(this.state.data);
			var sets = this.renderSets(this.state.data.sets);
			if(sets.length === 0){
				sets = <p>No sets</p>
			}
		}else{
			data = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}
		
		
		return (			
		  <div>
			<h2>Workout: {this.state.id}</h2>


			<Row>
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/workouts/' + this.state.data.prev_id}>
							<Button block><FontAwesome name="caret-left" size="2x"/></Button>
						</Link>
					</FormGroup>
				</Col>
				
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/workouts/' + this.state.data.next_id}>
							<Button block><FontAwesome name="caret-right" size="2x"/></Button>
						</Link>
					</FormGroup>

				</Col>
			</Row>					
			

			<Row>
				<Col md={12}>
					{workout}
					{sets}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkout;