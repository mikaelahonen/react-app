import React, { Component } from 'react';
import {groupBy} from 'functions/Functions';
import {MainTitle, FormInput} from 'components/Components';
import { LinkContainer } from 'react-router-bootstrap';
import{connect} from 'react-redux'
import * as workoutActions from 'actions/workoutActions';
import GymWorkoutModal from './GymWorkoutModal'
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';

class GymWorkoutQuickView extends React.Component {

	handleModalOpen(set){
		this.props.modalOpen(true)
		this.props.modalSet(set)
	}

  render(){

			var elementStyle = {
				textAlign: 'center',
			}

			var excerciseStyle = {
				color: 'gray',
			}

			var grouped = groupBy(this.props.workout.sets,"excercise_name");
			var excercises = [];
			for(var excercise in grouped){

				var sets = []
				grouped[excercise].map((set, index) => {

					//set id done?

					var btnClasses = "circle"
					var bsStyle = "default"
					if(set.done){
						btnClasses = "circle"
						bsStyle = "success"
					}

					var setItem =
						<Button className={btnClasses} bsStyle={bsStyle} key={index} onClick={() => this.handleModalOpen(set)}>
							{set.reps + "x" + set.weight}
						</Button>
					sets.push(setItem)
				})

				var excerciseItem =
					<div className="circle-container">
						<h3 style={excerciseStyle}>{excercise}</h3>
						{sets}
					</div>

				excercises.push(excerciseItem)
			}

			return (
				<div>
					{excercises}
					<GymWorkoutModal />
				</div>
			);

  	} //End render function

} //End class

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

const GymWorkoutQuickViewConnected = connect(mapStateToProps, mapDispatchToProps)(GymWorkoutQuickView);

export default GymWorkoutQuickViewConnected;
