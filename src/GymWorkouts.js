import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import ApiTable from './ApiTable';
import FormWorkout from './Forms';
import {getData} from './Api';
import FontAwesome from  'react-fontawesome';

class GymWorkouts extends React.Component {
	
	form = [
		{id:{type: 'number'}},
		{workout:{type: 'text'}},
		{start_time:{type: 'datetime-local'}},
		{end_time:{type: 'datetime-local'}},
		{location:{type: 'text'}}
	]
	
	endpoint = '/gym/workouts/';
	
	state = {
		selected: '0',
		reload: 0,
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
		var selected = e.currentTarget.getAttribute('data-row');
		this.setState({
			selected: selected,
		});
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
		var selectedObject = undefined;
		var spinner = <FontAwesome name="circle-o-notch" size="3x" spin/>;		
		if(this.state.ready){
			//Render data table
			table = <ApiTable data={this.state.data} changeSelected={(e) => this.changeSelected(e)}/>;
			//Get selected object by id			
			selectedObject = this.state.data.filter((obj) => {
				return obj.id == this.state.selected;
			})[0];
		}
		
		return (			
		  <div>
			<h1>Gym Workouts</h1>
			<legend></legend>
			<Row>
				<Col md={4}>
					<FormWorkout form={this.form} selected={selectedObject} handleDelete={() => this.handleDelete()} />	
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