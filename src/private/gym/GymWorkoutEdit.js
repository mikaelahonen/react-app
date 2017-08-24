import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup} from 'react-bootstrap';
import {getData} from 'functions/Api';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkoutEdit extends React.Component {
	
	state = {
		ready: false,
		data: {},
	}	
	
	
	createSets(workout){

		var item = 
			<Panel 
				header={workout.name}
				onClick={(event) => this.handleClick(workout.id, event)}
				style={{cursor: 'pointer'}}
			>
				<p>Id: {workout.id}</p>
				<p>Start time: {workout.start_time}</p>
				<p>End time: {workout.end_time}</p>
				<p>Location: {workout.location}</p>
			</Panel>

		return item;
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
			data = this.createSets(this.state.data);
		}else{
			data = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}
		
		
		return (			
		  <div>
			<h2>Workout: {this.state.id}</h2>


			<Row>
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/workouts/' + this.state.data.prev_id + '/edit'}>
							<Button block><FontAwesome name="caret-left" size="2x"/></Button>
						</Link>
					</FormGroup>
				</Col>
				
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/workouts/' + this.state.data.next_id + '/edit'}>
							<Button block><FontAwesome name="caret-right" size="2x"/></Button>
						</Link>
					</FormGroup>

				</Col>
			</Row>			

			<Row>
				<Col md={12}>					
					{data}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymWorkoutEdit;