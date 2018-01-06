import React, { Component } from 'react';
import {ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Modal, Dropdown, MenuItem, Button} from 'react-bootstrap';
import { MainTitle, FormInput} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import {Link, withRouter} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import{connect} from 'react-redux'
import * as workoutActions from 'actions/workoutActions';
import Plot1 from 'plotly/Plot-1'


class GymWorkoutModal extends React.Component {


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
							autoFocus
						/>

					<FormInput
							id="weight"
							label="Weight"
							type="number"
							value={this.props.workout.modalSet.weight}
						/>

					<FormInput
							id="comments"
							label="Comments"
							componentClass="textarea"
							value={this.props.workout.modalSet.comments}
						/>
					</form>

					<Plot1 />

				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="success" onClick={() => this.props.modalOpen(false)}>
						Done
					</Button>
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
  }
};

const GymWorkoutModalConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(GymWorkoutModal));

export default GymWorkoutModalConnected;
