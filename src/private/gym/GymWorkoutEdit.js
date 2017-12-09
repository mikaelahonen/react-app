import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import Loading from 'components/Components';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkoutEdit extends React.Component {

	state = {
		ready: false,
		data: {},
	}


	handleSave(id, event){
		var endpoint = '/gym/workouts/' + id + '/';
		putData(endpoint, this.state.data).then(repsonse => {
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
							id="start_time"
							type="text"
							placeholder="2017-10-10T17:00:00Z"
							defaultValue={this.state.data.start_time}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>End time</ControlLabel>
						<FormControl
						  id="end_time"
						  type="text"
						  placeholder="2017-10-10T17:00:00+02"
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

			</div>

		return form;
	}

	renderSaveButton(){
		return (
			<Button bsStyle="success" onClick={(event) => this.handleSave(this.state.data.id, event)}>
				<FontAwesome name="save"/>
				&nbsp;
				Save
			</Button>
		)
	}

	renderNavButtons(){
		return (
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
		)
	}

	componentWillMount(){
		this.setState({
			id: this.props.match.params.id
		});
	}

	componentWillReceiveProps(nextProps){
		this.setState(this.state);
		this.getWorkout();
	}

	componentDidMount(){
		this.getWorkout();
	}


	getWorkout(){
		var id = this.props.match.params.id;
		getData('/gym/workouts/' + id + '/').then(data => {
			var state = {data: data, ready: true};
			this.setState(state);
		});
	}

	render() {

		var form = undefined;
		var saveButton = undefined;
		var title = undefined;
		var loading = <Loading/>;

		if(this.state.ready){
			form = this.createForm(this.state.data);
			saveButton = this.renderSaveButton();
			loading = undefined;
		}


		return (
		  <div>
				{this.renderNavButtons()}
				<h2>Workout: {this.props.match.params.id}</h2>
				<Row>
					<Col md={12}>
						{loading}
						{form}
						{saveButton}
					</Col>
				</Row>
		  </div>
		)

	}
}

export default GymWorkoutEdit;
