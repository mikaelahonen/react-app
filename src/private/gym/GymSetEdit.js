import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel, Radio, Checkbox} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymSetEdit extends React.Component {
	
	state = {
		ready: false,
		data: {},
	}	
	
	handleDelete(id, event){
		console.log('Delete object with id: ' + id + ', Event: ' + event);				
		var endpoint = '/gym/sets/' + id + '/';
		deleteData(endpoint)
		.then((json)=>{
			this.props.history.push('/gym/workouts/' + this.data.workout);
		});
	}
	
	handleUpdate(id, event){
		console.log('Update object with id: ' + id + ', Event: ' + event);
		var endpoint = '/gym/sets/' + id + '/';
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
	
	
	createForm(set){
		
		var form = 
		
			<div>
		
				<ButtonToolbar>
		
					<Button bsStyle="primary" onClick={(event) => this.handleUpdate(set.id, event)}>
						<FontAwesome name="refresh"/>
						&nbsp;
						Update
					</Button>

					<Button bsStyle="danger" onClick={(event) => this.handleDelete(set.id, event)}>
						<FontAwesome name="remove"/>
						&nbsp;
						Delete
					</Button>

					<LinkContainer to={'/gym/workouts/' + this.state.data.workout}>
						<Button bsStyle="success">
							<FontAwesome name="arrow-right"/>
							&nbsp;
							Back to workout
						</Button>
					</LinkContainer>
				
				</ButtonToolbar>
			
			
				<form>
					<h3>Set</h3>
						<FormGroup>
							<ControlLabel>Reps</ControlLabel>
							<FormControl
								id="reps"
								type="number"
								placeholder="10"
								defaultValue={this.state.data.reps}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>

						<FormGroup>
							<ControlLabel>Weight</ControlLabel>
							<FormControl
							  id="weight"
							  type="number"
							  placeholder="80"
							  defaultValue={this.state.data.weight}
							  onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
						
						<FormGroup controlId="done">
							<ControlLabel>Done</ControlLabel>
							<FormControl 
								componentClass="select" 
								id="done" 
								defaultValue={this.state.data.done}
								onChange={(e) => this.handleChange(e)}>
								<option value={true}>True</option>
								<option value={false}>False</option>
							</FormControl>
						</FormGroup>
					<h3>Details</h3>
					
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
						<ControlLabel>Workout ({this.state.data.workout_name})</ControlLabel>
						<FormControl
							id="workout"
							type="number"
							placeholder="Bicep and Chest"
							defaultValue={this.state.data.workout}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					

					
					<FormGroup>
						<ControlLabel>Excercise ({this.state.data.excercise_name})</ControlLabel>
						<FormControl
						  id="excercise"
						  type="number"
						  placeholder="9"
						  defaultValue={this.state.data.excercise}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Workout Order</ControlLabel>
						<FormControl
						  id="workout_order"
						  type="number"
						  placeholder="1"
						  defaultValue={this.state.data.workout_order}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
				</form>						
				
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
		this.getset(id);
	}
	
	componentDidMount(){
		var id = this.props.match.params.id
		this.getset(id);
	}
	
	
	getset(id){
		var data = getData('/gym/sets/' + id + '/')
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
			<h2>set: {this.state.id}</h2>


			<Row>
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/sets/' + this.state.data.prev_id + '/edit'}>
							<Button block><FontAwesome name="caret-left" size="2x"/></Button>
						</Link>
					</FormGroup>
				</Col>
				
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/sets/' + this.state.data.next_id + '/edit'}>
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

export default GymSetEdit;
