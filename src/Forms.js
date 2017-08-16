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
	
	handleValue(input){
		var value = undefined;
		if(this.props.selectedObject !== undefined){
			var type = input.type;
			var name = input.name;
			value = this.props.selectedObject[input.name];
			//Django rest returns time in format "2017-08-10T10:02:04Z" so strip the Z out
			if(type==='datetime-local'){
				value = value.replace('Z','');
			}
			return value;
		}
		return value;

	}
	
	render() {			
		
		//Insert input values if table row is clicked
		//Consider using componentWIllReceiveProps
		var inputs = [];
		this.props.form.map((input, index) => {
			var anInput = (
				 <FormGroup key={index}>
					<ControlLabel>{input.name.replace('_',' ').toUpperCase()}</ControlLabel>
					<FormControl
						readOnly = {input.hasOwnProperty(input.readOnly) ? true : false}
						value = {this.handleValue(input)}
						name={input.name} 
						type={input.type} 
						placeholder={input.placeholder} 
						onChange={(e) => this.handleChange(e)} 
					/>
				</FormGroup>
			);
			inputs.push(anInput);
		});
		
		console.log('Form reaction.');
		
		return (			
		
			<form id="form" onSubmit={this.handleSubmit}>

				{inputs}
				
				<ButtonToolbar>
					<Button title="Add new" onClick={(e) => this.addItem(e)}><FontAwesome name="plus-square"/></Button>
					<Button title="Save changes" onClick={this.updateItem}><FontAwesome name="save"/></Button>
					<Button title="Delete item" onClick={(e) => this.deleteItem(e)}><FontAwesome name="trash-o"/></Button>
				</ButtonToolbar>

			</form>

		);

	}
}



export default FormWorkout;
