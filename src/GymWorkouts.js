import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import ApiTable from './ApiTable';
import FormWorkout from './Forms';


class GymWorkouts extends React.Component {
	
	state = {
		selected: '[None]',
	}
	
	changeSelected(e){
		var selected = e.currentTarget.getAttribute('data-row');
		this.setState({
			selected: selected,
		});
		e.prevenDefault;
	}
	
	render() {
		
		return (			
		  <div>
			<h1>Gym Workouts</h1>
			<legend></legend>
			<Row>
				<Col md={4}>
					<h2>Current workout</h2>
					<FormWorkout selected={this.state.selected} />	
				</Col>
				<Col md={8}>
					<h2>All workouts</h2>					
					<ApiTable endpoint='/gym/workouts/' changeSelected={(e) => this.changeSelected(e)}/>
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GymWorkouts;