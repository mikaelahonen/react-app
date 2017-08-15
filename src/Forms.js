import React, { Component } from 'react';
import { Button, ButtonToolbar, FormControl, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import {deleteData} from './Api';

class FormWorkout extends React.Component {

	
	addItem(e){
		console.log("Add new item");
		this.setState(this.state);
		e.preventDefault;
	}
	
	deleteItem(e){
		var ask = window.confirm('Delete object with id ' + this.props.selected);
		if(ask){
			console.log("Delete item ", this.props.selected);
			deleteData('/gym/workouts/' + this.props.selected)
			.then((response) => {
				//Clear form fields
				//this.setState(this.state);
				console.log("Workout state: ", this.state.workout);
				this.props.handleDelete();
			});
		}else{
			console.log('Delete canceled');
		}
	}
	
	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		console.log('Changed');
	}
	
	
	render() {			
		
		//Insert input values if table row is clicked
		//Consider using componentWIllReceiveProps
		const inputs = this.props.form.map((input, index) =>
			<FormGroup key={index}>
				<ControlLabel>{input.name.replace('_',' ').toUpperCase()}</ControlLabel>
				<FormControl name={input.name} type={input.type} placeholder={input.placeholder} onChange={(e) => this.handleChange(e)} />
			</FormGroup>
		);	
		
		console.log('Form reaction');
		
		return (			
		
			<form id="form" onSubmit={this.handleSubmit}>
				
				{inputs}
				
				<ButtonToolbar>
					<Button title="Add new" onClick={(e) => this.addItem(e)}><FontAwesome name="plus"/></Button>
					<Button title="Save changes" onClick={this.updateItem}><FontAwesome name="save"/></Button>
					<Button title="Delete item" onClick={(e) => this.deleteItem(e)}><FontAwesome name="remove"/></Button>
				</ButtonToolbar>

			</form>

		);

	}
}



export default FormWorkout;
