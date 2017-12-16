import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel, Radio, Checkbox} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import {Loading, Btn, FormInput, FormSelect} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymSetEdit extends React.Component {

	state = {ready: false, data: {}}

	handleDoneReturn(event){

		//Mark as done
		var set = this.state.data;
		set.done = true;
		this.setState(set)

		var id = this.state.data.id;
		var endpoint = '/gym/sets/' + id + '/';
		var redirect = '/gym/workouts/' + this.state.data.workout;
		putData(endpoint, this.state.data).then(response => {
			this.props.history.push(redirect);
		});
	}

	handleSaveReturn(event){
		var id = this.state.data.id;
		var endpoint = '/gym/sets/' + id + '/';
		var redirect = '/gym/workouts/' + this.state.data.workout;
		putData(endpoint, this.state.data).then(response => {
			this.props.history.push(redirect);
		});
	}

	handleSaveStay(event){
		var id = this.state.data.id;
		var endpoint = '/gym/sets/' + id + '/';
		putData(endpoint, this.state.data).then(response => {
			this.props.history.push();
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

					<FormInput
							id="reps"
							label="Reps"
							type="number"
							value={this.state.data.reps}
							onChange={(e) => this.handleChange(e)}
							onSelect={(e) => this.handleInputSelect(e)}
							autoFocus
						/>

					<FormInput
						  id="weight"
							label="Weight"
						  type="number"
						  value={this.state.data.weight}
						  onChange={(e) => this.handleChange(e)}
						  onSelect={(event) => this.handleInputSelect(event)}
						/>

					<FormInput
						  id="comments"
							label="Comments"
						  componentClass="textarea"
						  value={this.state.data.comments}
						  onChange={(e) => this.handleChange(e)}
						/>

				<h3>Details</h3>
				<hr/>

				<FormSelect
						id="done"
						label="Done"
						value={this.state.data.done}
						onChange={(e) => this.handleChange(e)}
						options={{true:"True", false:"False"}}
					/>

				<FormInput
						readOnly
						id="id"
						label="Id"
						type="number"
						value={this.state.data.id}
					/>

				<FormInput
						id="workout"
						label={"Workout (" + this.state.data.workout_name + ")"}
						type="number"
						value={this.state.data.workout}
						onChange={(e) => this.handleChange(e)}
					/>

					<FormInput
					  id="excercise"
						label={"Excercise (" + this.state.data.excercise_name + ")"}
					  type="number"
					  value={this.state.data.excercise}
					  onChange={(e) => this.handleChange(e)}
					/>

					<FormInput
					  id="workout_order"
						label="Workout Order"
					  type="number"
					  value={this.state.data.workout_order}
					  onChange={(e) => this.handleChange(e)}
					/>

			</form>
		)
	}

	renderButtonToolbar(){
		return(
			<ButtonToolbar>
				<Btn
					bsStyle="success"
					icon="check"
					text="Done and return"
					iconFirst={true}
					onClick={(event) => this.handleDoneReturn(event)}
					/>

				<Btn
					bsStyle="success"
					icon="check"
					text="Save and return"
					iconFirst={true}
					onClick={(event) => this.handleSaveReturn(event)}
					/>

					<Btn
						bsStyle="success"
						icon="check"
						text="Save and stay"
						iconFirst={true}
						onClick={(event) => this.handleSaveStay(event)}
						/>
				</ButtonToolbar>
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
						{this.renderButtonToolbar()}
					{form}
				</Col>
			</Row>
		)
	}
}

export default GymSetEdit;
