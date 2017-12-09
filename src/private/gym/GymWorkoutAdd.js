import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {postData} from 'functions/Api';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkoutAdd extends React.Component {

	state = {
		data: {},
	}

	handleSave(event){
		console.log('Save new object.');
		var endpoint = '/gym/workouts/';
		var redirect = '/gym/workouts';
		postData(endpoint, this.state.data)
		.then((json)=>{
			this.props.history.push(redirect);
		});
	}

	handleChange(event){

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;

		var data = this.state.data;
		data[name] = value;

		this.setState({
			data: data,
		})

	}

	renderForm(){

		return(
			<form>

				<FormGroup>
					<ControlLabel>Name</ControlLabel>
					<FormControl
						id="name"
						type="text"
						placeholder="Bicep and Chest"
						onChange={(e) => this.handleChange(e)}
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Start time</ControlLabel>
					<FormControl
						id="start_time"
						type="text"
						placeholder="2017-10-10T17:00:00Z"
						onChange={(e) => this.handleChange(e)}
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>End time</ControlLabel>
					<FormControl
					  id="end_time"
					  type="text"
					  placeholder="2017-10-10T17:00:00+02"
					  onChange={(e) => this.handleChange(e)}
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Location</ControlLabel>
					<FormControl
					  id="location"
					  type="text"
					  placeholder="Location X"
					  onChange={(e) => this.handleChange(e)}
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Comments</ControlLabel>
					<FormControl
						id="comments"
						componentClass="textarea"
						placeholder="Comments."
						onChange={(e) => this.handleChange(e)}
					/>
				</FormGroup>

			</form>
		)
	}

	renderSaveButton(){
		return (
			<Button bsStyle="success" onClick={(event) => this.handleSave(event)}>
				<FontAwesome name="save"/>
				&nbsp;
				Save
			</Button>
		)
	}

	render() {
		return (
			<div>
				<h2>Add workout</h2>
				<Row>
					<Col md={12}>
						{this.renderForm()}
						{this.renderSaveButton()}
					</Col>
				</Row>
			</div>
		)
	}
}

export default GymWorkoutAdd;
