import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import ApiTable from './ApiTable';
import FormWorkout from './Forms';
import {getData} from './Api';
import FontAwesome from  'react-fontawesome';

class GymWorkouts extends React.Component {
	
	form = [
		{name: 'id', type: 'number', placeholder: '[Null]', readOnly: 'readOnly'},
		{name: 'name', type: 'text', placeholder: 'Workout name'},
		{name: 'start_time', type: 'datetime-local'},
		{name: 'end_time', type: 'datetime-local'},
		{name: 'location', type: 'text', placeholder: 'Workout location'}
	]
	
	endpoint = '/gym/workouts/';
	
	state = {
		ready: false,
		data: undefined,
		selected: undefined,
	}
	
	updateTable(){
		getData(this.endpoint)
		.then((json)=>{
			var data = json;
			this.setState({
				data: data,
				ready: true
			});
		});
	}
	
	changeSelected(e){
		
		var selectedId = e.currentTarget.getAttribute('data-row');		
		var selectedObject = this.state.data.filter((obj) => {
			return obj.id == selectedId;
		})[0];
			
		this.setState({
			selectedObject: selectedObject,
		});
		
		console.log("Selected object: ", selectedObject);
		
		e.preventDefault;
	}
	
	handleDelete(){
		console.log('Handle delete');
		this.setState({
			selected: 0,
			ready: false,
		});
		this.updateTable();
	}
	
	componentWillMount(){
		this.updateTable();
	}

	render() {
		var table = <div>{spinner}</div>;
		var spinner = <FontAwesome name="circle-o-notch" size="3x" spin/>;		
		if(this.state.ready){
			//Render data table
			table = <ApiTable data={this.state.data} changeSelected={(e) => this.changeSelected(e)}/>;				
			console.log('This.state.ready');			
		}
		
		return (			
		  <div>
			<h1>Gym Workouts</h1>
			<legend></legend>
			<Row>
				<Col md={4}>
					<FormWorkout form={this.form} selectedObject={this.state.selectedObject} handleDelete={() => this.handleDelete()} />	
				</Col>
				<Col md={8}>
					{table}
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GymWorkouts;