import React, { Component } from 'react';
import { Button, ButtonToolbar, FormControl, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import {deleteData} from './Api';

class FormWorkout extends React.Component {

	
	state = {
		workout: '',
		start_time: '',
		end_time: '',
		location: '',
	}
	
	addItem(e){
		console.log("Add new item");
		this.setState({
			workout: 'Workout 1',
			start_time: '2017-10-11T11:12:13',
			end_time: '',
			location: '',
		});
		e.preventDefault;
	}
	
	deleteItem(e){
		var ask = window.confirm('Delete object with id ' + this.props.selected);
		if(ask){
			console.log("Delete item ", this.props.selected);
			deleteData('/gym/workouts/' + this.props.selected)
			.then((response) => {
				//Clear form fields
				//this.setState(this.state);
				console.log("Workout state: ", this.state.workout);
				this.props.handleDelete();
			});
		}else{
			console.log('Delete canceled');
		}
	}
	
	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	
	render() {
		
		return (			
		
				<form id="form" onSubmit={this.handleSubmit}>
					<FormGroup>
						<ControlLabel>Id</ControlLabel>
						<FormControl name="id" type="text" disabled value={this.props.selected} />
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Workout</ControlLabel>
						<FormControl name="workout" type="text" placeholder="Full body" onChange={(e) => this.handleChange(e)} />
					</FormGroup>
					
					<FormGroup>
						<InputGroup>
							<ControlLabel>Start time</ControlLabel>
						</InputGroup>
						<InputGroup>
							<FormControl name="start_time" type="datetime-local" />
							<InputGroup.Button><Button>Now</Button></InputGroup.Button>
						</InputGroup>
					</FormGroup>
					
					<FormGroup>
						<InputGroup>
							<ControlLabel>End time</ControlLabel>
						</InputGroup>
						<InputGroup>
							<FormControl name="end_time" type="datetime-local" />
							<InputGroup.Button><Button>Now</Button></InputGroup.Button>
						</InputGroup>
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Location</ControlLabel>
						<FormControl name="location" type="text" placeholder="My gym" />
					</FormGroup>
					
					<ButtonToolbar>
						<Button title="Add new" onClick={(e) => this.addItem(e)}><FontAwesome name="plus"/></Button>
						<Button title="Save changes" onClick={this.updateItem}><FontAwesome name="save"/></Button>
						<Button title="Delete item" onClick={(e) => this.deleteItem(e)}><FontAwesome name="remove"/></Button>
					</ButtonToolbar>
	
				</form>

		);

	}
}



export default FormWorkout;
