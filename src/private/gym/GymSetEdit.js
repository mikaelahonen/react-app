import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel, Radio, Checkbox} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import {Loading, Btn, FormInput, FormSelect, PageTitle} from 'components/Components';
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

	handleSaveStay(event){
		var id = this.state.data.id;
		var endpoint = '/gym/sets/' + id + '/';
		putData(endpoint, this.state.data).then(response => {
			this.props.history.push();
		});
	}

	handleInputSelect(event){
		console.log("handleInputSelect")
		event.target.select();

	}

	handleChange(event){
		console.log("handleChange")
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

					<PageTitle title="Edit set" hr={true} />

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
					icon="save"
					text="Save and return"
					iconFirst={true}
					onClick={(event) => this.handleSaveReturn(event)}
					/>

					<Btn
						bsStyle="default"
						icon="check"
						text="Save and stay"
						iconFirst={true}
						onClick={(event) => this.handleSaveStay(event)}
						/>
				</ButtonToolbar>
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
			wait = "";
		}

		return (

			<Row>
				<Col md={12}>
					{wait}
						{this.renderButtonToolbar()}
					{form}
				</Col>
			</Row>
		)
	}
}

export default GymSetEdit;
