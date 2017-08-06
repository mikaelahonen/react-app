import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import ApiTable from './ApiTable';
import FormWorkout from './Forms';


class GymWorkouts extends React.Component {
	
	render() {
		
		return (			
		  <div>
			<h1>Gym Workouts</h1>
			<legend></legend>
			<Row>
				<Col md={4}>
					<h2>Current workout</h2>
					<FormWorkout />	
				</Col>
				<Col md={8}>
					<h2>All workouts</h2>					
					<ApiTable endpoint='/gym/workouts/'/>
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GymWorkouts;