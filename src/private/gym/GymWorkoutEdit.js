import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkoutEdit extends React.Component {
	
	state = {
		ready: false,
		data: {},
	}	
	
	handleDelete(id, event){
		console.log('Delete object with id: ' + id + ', Event: ' + event);				
		var endpoint = '/gym/workouts/' + id + '/';
		deleteData(endpoint)
		.then((json)=>{
			this.props.history.push('/gym/workouts');
		});
	}
	
	handleUpdate(id, event){
		console.log('Update object with id: ' + id + ', Event: ' + event);
		var endpoint = '/gym/workouts/' + id + '/';
		putData(endpoint, this.state.data)
		.then((json)=>{
			this.props.history.push();
		});		
	}
	
	handleChange(event){

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;
		
		/*this.setState({
			data: {[name]: value}
		});*/
		
		this.state.data[name] = value;
		
		console.log("Form state: " + this.state.data[name]);
	}
	
	
	createForm(workout){
		
		var form = 
			
			<div>
				<form>
					<FormGroup>
						<ControlLabel>Id</ControlLabel>
						<FormControl
							readOnly
							id="id"
							type="number"
							placeholder="id"
							value={this.state.data.id}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Name</ControlLabel>
						<FormControl
							id="name"
							type="text"
							placeholder="Bicep and Chest"
							defaultValue={this.state.data.name}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Start time</ControlLabel>
						<FormControl
							id="Start_time"
							type="text"
							placeholder="2017-01-01"
							defaultValue={this.state.data.start_time}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>End time</ControlLabel>
						<FormControl
						  id="end_time"
						  type="text"
						  placeholder="2017-01-31"
						  defaultValue={this.state.data.end_time}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Location</ControlLabel>
						<FormControl
						  id="location"
						  type="text"
						  placeholder="Location X"
						  defaultValue={this.state.data.location}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
				</form>						
				
				<ButtonToolbar>
		
					<Button bsStyle="primary" onClick={(event) => this.handleUpdate(workout.id, event)}>
						<FontAwesome name="refresh"/>
						&nbsp;
						Update
					</Button>

					<Button bsStyle="danger" onClick={(event) => this.handleDelete(workout.id, event)}>
						<FontAwesome name="remove"/>
						&nbsp;
						Delete
					</Button>

				
				</ButtonToolbar>
				
			</div>

		return form;
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
		
		var form = undefined;
		if(this.state.ready){
			form = this.createForm(this.state.data);
		}else{
			form = <FontAwesome name="circle-o-notch" size="3x" spin/>;
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
					{form}
				</Col>
			</Row>
			

		  </div>
		)
	}
}

export default GymWorkoutEdit;
