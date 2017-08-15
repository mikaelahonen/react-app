import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import ApiTable from './ApiTable';
import FormWorkout from './Forms';


class GymWorkouts extends React.Component {
	
	state = {
		selected: '0',
		reload: 0,
	}
	
	changeSelected(e){
		var selected = e.currentTarget.getAttribute('data-row');
		this.setState({
			selected: selected,
		});
		e.preventDefault;
	}
	
	handleDelete(){
		console.log('Handle delete');
		this.setState({
			selected: '0',
			reload: this.state.reload + 1,
		});
	}
	
	
	render() {
		
		return (			
		  <div>
			<h1>Gym Workouts</h1>
			<legend></legend>
			<Row>
				<Col md={4}>
					<FormWorkout selected={this.state.selected} handleDelete={() => this.handleDelete()} />	
				</Col>
				<Col md={8}>
					<ApiTable endpoint={'/gym/workouts/'} reload={this.state.reload} changeSelected={(e) => this.changeSelected(e)}/>
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GymWorkouts;