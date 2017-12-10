import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel, Radio, Checkbox} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import {Loading, Btn} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymSetEdit extends React.Component {

	state = {ready: false, data: {}}

	handleSaveReturn(event){
		var id = this.state.data.id;
		var endpoint = '/gym/sets/' + id + '/';
		var redirect = '/gym/workouts/' + this.state.data.workout;
		putData(endpoint, this.state.data).then(response => {
			this.props.history.push(redirect);
		});
	}

	handleInputSelect(event){
		event.target.select();
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

	createForm(set){

		return(
				<form>

					<h3>Set</h3>
					<hr/>

					<FormGroup>
						<ControlLabel>Reps</ControlLabel>
						<FormControl
							id="reps"
							type="number"
							placeholder="10"
							defaultValue={this.state.data.reps}
							onChange={(e) => this.handleChange(e)}
							onSelect={(event) => this.handleInputSelect(event)}
							autoFocus
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
						  onSelect={(event) => this.handleInputSelect(event)}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Comments</ControlLabel>
						<FormControl
						  id="comments"
						  componentClass="textarea"
						  placeholder="Add comments."
						  defaultValue={this.state.data.comments}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>

				<h3>Details</h3>
				<hr/>

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
		)
	}

	renderSaveButton(){
		return(
			<Btn
				bsStyle="success"
				icon="check"
				text="Save and return"
				iconFirst={true}
				onClick={(event) => this.handleSaveReturn(event)}
				/>
		);
	}

	renderNavButtons(){
		return(
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
		);
	}

	componentWillMount(){
		console.log('will mount');
		this.setState({
			id: this.props.match.params.id
		});
	}

	componentWillReceiveProps(nextProps){
		var id = nextProps.match.params.id;
		var state = {ready: false}
		this.setState(state);
		this.getset();
	}

	componentDidMount(){
		this.getset();
	}


	getset(){
		var id = this.props.match.params.id
		getData('/gym/sets/' + id + '/').then(response => {
			var state = {data: response, ready: true}
			this.setState(state);
		});
	}

	render() {

		var navButtons = "";
		var form = undefined;
		var wait = <Loading/>

		if(this.state.ready){
			form = this.createForm(this.state.data);
			navButtons = this.renderNavButtons();
			wait = "";
		}


		return (

			<Row>
				<Col md={12}>
					{wait}
					{navButtons}
					{this.renderSaveButton()}
					{form}
				</Col>
			</Row>
		)
	}
}

export default GymSetEdit;
