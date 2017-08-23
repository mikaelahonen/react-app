import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';

class GymWorkout extends React.Component {
	
	form = [
		{name: 'id', type: 'number', placeholder: '[Null]', readOnly: 'readOnly'},
		{name: 'name', type: 'text', placeholder: 'Workout name'},
		{name: 'start_time', type: 'datetime-local'},
		{name: 'end_time', type: 'datetime-local'},
		{name: 'location', type: 'text', placeholder: 'Workout location'}
	]


	render() {
		
		return (			
		  <div>
			<h1>Gym Workouts</h1>
			<legend></legend>
			<Row>
				<Col md={12}>
	Single workout with id: {this.props.match.params.id}
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GymWorkout;