import React, { Component } from 'react';
import {ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Modal, Dropdown, MenuItem, Button} from 'react-bootstrap';
import { MainTitle, FormInput} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import {Link, withRouter} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import{connect} from 'react-redux'
import * as workoutActions from 'actions/workoutActions';
import Plot1 from 'plotly/Plot-1'
import {putData} from 'functions/Api';


class GymWorkoutModal extends React.Component {

	handleChange(event){

		console.log("handleChange")

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;

		var newSet = this.props.workout.modalSet;
		newSet[name] = value;
		console.log("newSet");
		console.log(newSet);
		this.props.modalSet(newSet);

	}

	handleClickEdit(event){
		console.log("Click edit");

		//Close the modal window
		this.props.modalOpen(false)

		//Go to edit view
		var id = this.props.workout.modalSet.id;
		this.props.history.push('/gym/sets/' + id + '/edit');
	}

	handleSaveReturn(event){

		//Mark as done
		console.log("Mark set done, save, and close modal");
		var newSet = this.props.workout.modalSet;
		newSet["done"] = true;
		this.props.modalSet(newSet);

		//Send changes to API
		var id = this.props.workout.modalSet.id;
		var endpoint = '/gym/sets/' + id + '/';
		var redirect = '/gym/workouts/' + this.props.workout.workout.id;
		putData(endpoint, this.props.workout.modalSet).then(response => {
			this.props.modalOpen(false);
			this.props.history.push(redirect);
		});
	}

	render(){

		var modal =
			<Modal show={this.props.workout.modalOpen} onHide={() => this.props.modalOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{this.props.workout.modalSet.excercise_name} (#{this.props.workout.modalSet.workout_order})
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				<form>
					<FormInput
							id="reps"
							label="Reps"
							type="number"
							value={this.props.workout.modalSet.reps}
							onChange={(e) => this.handleChange(e)}
							autoFocus
						/>

					<FormInput
							id="weight"
							label="Weight"
							type="number"
							value={this.props.workout.modalSet.weight}
							onChange={(e) => this.handleChange(e)}
						/>

					<FormInput
							id="comments"
							label="Comments"
							componentClass="textarea"
							value={this.props.workout.modalSet.comments}
							onChange={(e) => this.handleChange(e)}
						/>
					</form>

					<ButtonToolbar>
						<Button bsStyle="success" onClick={() => this.handleSaveReturn(false)}>
							Save
						</Button>
					</ButtonToolbar>

					<Plot1 />

				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button onClick={(e) => this.handleClickEdit(e)}>
							Edit
						</Button>
						<Button bsStyle="danger" onClick={() => this.props.modalOpen(false)}>
							Cancel
						</Button>
					</ButtonToolbar>
				</Modal.Footer>
			</Modal>
		return modal
	}

}

// Maps state from store to props
// To fetch data from Redux store
function mapStateToProps(state, ownProps){
  return {
    // You can now say this.props.workout
    workout: state.workout
  }
}

// Maps actions to props
// To send data to Redux store
function mapDispatchToProps(dispatch){
  return {
  // You can now say this.props.setView
		modalOpen: (isOpen) => dispatch(workoutActions.modalOpen(isOpen)),
		modalSet: (set) => dispatch(workoutActions.modalSet(set)),
  }
};

const GymWorkoutModalConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(GymWorkoutModal));

export default GymWorkoutModalConnected;
