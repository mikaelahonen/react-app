import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {postData} from 'functions/Api';
import {FormInput} from 'components/Components'
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkoutAdd extends React.Component {

	state = {data: {}}

	handleSave(event){
		var endpoint = '/gym/workouts/';
		var redirect = '/gym/workouts';
		postData(endpoint, this.state.data).then(json => {
			this.props.history.push(redirect);
		});
	}

	handleChange(event){

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;

		var data = this.state.data;
		console.log("date[name]: " + data[name])
		console.log("value: " + value)
		data[name] = value;

		var state = {data: data};
		this.setState(state);

	}

	renderForm(){

		return(
			<form>

				<FormInput id="name" label="Name"
					value = {this.state.data.name}
					onChange={(e) => this.handleChange(e)}
				/>

				<FormInput id="start_time" label="Start time" type="datetime-local"
					value = {this.state.data.start_time}
					onChange={(e) => this.handleChange(e)}
				/>

				<FormInput id="end_time" label="End time" type="datetime-local"
					value = {this.state.data.end_time}
					onChange={(e) => this.handleChange(e)}
				/>

				<FormInput id="location" label="location"
					value = {this.state.data.location}
				  onChange={(e) => this.handleChange(e)}
				/>

				<FormInput id="comments" label="Comments" type="textarea"
					value = {this.state.data.comments}
					onChange={(e) => this.handleChange(e)}
				/>

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
