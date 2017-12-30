import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import {Loading, Btn, FormInput, PageTitle} from 'components/Components';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

class GymWorkoutEdit extends React.Component {

	state = {ready: false, data: {}}

	handleSave(id, event){
		var endpoint = '/gym/workouts/' + id + '/';
		var redirect = '/gym/workouts'
		putData(endpoint, this.state.data).then(repsonse => {
			this.props.history.push(redirect);
		});
	}

	handleChange(event){

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;

		var inputs = this.state.data;
		inputs[name] = value

		var state = {data: inputs};
		this.setState(state);

	}

	createForm(workout){

		return (
				<form>
					<FormInput
							label="id"
							readOnly
							id="id"
							type="number"
							value={this.state.data.id}
						/>

					<FormInput
							id="name"
							label="Name"
							value={this.state.data.name}
							onChange={(e) => this.handleChange(e)}
						/>

					<FormInput
							id="start_time"
							label="Start time"
							type="datetime-local"
							value={this.state.data.start_time}
							onChange={(e) => this.handleChange(e)}
						/>

					<FormInput
							label="End time"
						  id="end_time"
							type="datetime-local"
						  value={this.state.data.end_time}
						  onChange={(e) => this.handleChange(e)}
						/>

					<FormInput
						  id="location"
							label="Location"
						  value={this.state.data.location}
						  onChange={(e) => this.handleChange(e)}
						/>

					<FormInput
							id="comments"
							label="Comments"
							type="textarea"
							value={this.state.data.comments}
							onChange={(e) => this.handleChange(e)}
						/>

				</form>
			);
	}

	renderSaveButton(){
		return (
			<ButtonToolbar>
				<Btn bsStyle="success" icon="save" text="Save an return"
					onClick={(event) => this.handleSave(this.state.data.id, event)} />
			</ButtonToolbar>
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
		this.getWorkout();
	}

	componentWillReceiveProps(nextProps){
		this.setState(this.state);
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
				<PageTitle title="Edit workout" hr={true} />
				<Row>
					<Col md={12}>
						{loading}
						{saveButton}
						{form}
					</Col>
				</Row>
		  </div>
		)

	}
}

export default GymWorkoutEdit;
