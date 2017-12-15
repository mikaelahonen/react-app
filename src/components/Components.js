import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';
import {Table, Button, FormGroup, ControlLabel, FormControl, Label} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export class Loading extends React.Component {
	render() {
		return (
      <FontAwesome name="circle-o-notch" size="3x" spin/>
		);
	}
}

export class PageTitle extends React.Component {
	render(){
		var title = <h2 style={{color:'gray'}}>{this.props.title.toUpperCase()}</h2>

		var hr = undefined
		if(this.props.hr==true){
			hr = <hr/>
		}

		return (
			<div>
				{title}
				{hr}
			</div>
		);

	}
}

export class Btn extends React.Component {

	renderBtn(){

		var text = undefined;

		//If both icon and text
		if(this.props.text && this.props.icon){
			//Text first
			if(this.props.textFirst){
				text = <span>{this.props.text + " "}<FontAwesome name={this.props.icon}/></span>;

			}
			//Icon first
			else{
				text = <span><FontAwesome name={this.props.icon}/>{" "+this.props.text}</span>;
			}
		}
		//If only icon or text
		else{
			//If icon only
			if(this.props.icon){
				text = <FontAwesome name={this.props.icon}/>;
			}
			//If text only
			else{
				text = this.props.text;
			}
		}


		return(
			<Button
				bsStyle={this.props.bsStyle}
				onClick={this.props.onClick}
				bsSize={this.props.bsSize}>

				{text}

			</Button>
		);
	}

	render() {

		var btn = this.renderBtn();

		//Add link container, if "to" props is defined
		if(this.props.to){
			btn = <LinkContainer to={this.props.to}>{btn}</LinkContainer>
		}

		return btn;
	}
}

export class TableRow extends React.Component {

	tdWrap(){
		var tdList = []
		var i = 0;
		this.props.values.forEach(value => {
			var td = <td key={i} style={{color:'gray'}}>{value}</td>
			tdList = [...tdList, td]
			i = i + 1;
		});
		return tdList;
	}

	render(){
		var values = this.tdWrap();
		return (
			<tr onClick={this.props.onClick} style={this.props.style}>
				{values}
			</tr>
		)
	}
}

export class TableFrame extends React.Component {

	thWrap(){
		var thList = []
		var i = 0;
		this.props.heads.forEach(head => {
			var th = <th key={i} style={{color:'gray'}}>{head.toUpperCase()}</th>
    	thList = [...thList, th]
			i = i + 1;
		});
		return thList;
	}

	render() {
		var tableHead = this.thWrap()
		var tableRows = this.props.rows

		return(
			<Table responsive>
				<thead>
					<tr>
						{tableHead}
					</tr>
				</thead>
				<tbody>
					{tableRows}
				</tbody>
			</Table>
		)
	}
}

export class FormSelect extends React.Component{

	renderOptions(){

		//Initialize
		var noOption = <option key={0} value={null}>-</option>
		var items = [noOption]

		//Loop through the array
		for(var key in this.props.options){
				var value = this.props.options[key];
				var item = <option key={key} value={key}>{value}</option>
			//Add to items array
			items = [...items, item]
		}

		//Return a dictionary
		return items;
	}

	render(){

			var options = this.renderOptions();

			return(
				<FormGroup>

					<ControlLabel style={{color:'lightgray'}}>
							{this.props.label.toUpperCase()}
					</ControlLabel>

					<FormControl
						id={this.props.id}
						placeholder={this.props.placeholder}
						onChange={this.props.onChange}
						componentClass="select"
						value={this.props.value}>

						{options}

					</FormControl>

				</FormGroup>
		);
	}
}

export class FormInput extends React.Component {

	render(){

		var componentClass = undefined;
		var type = undefined;

		//componentClass or type?
		if(["textarea"].includes(this.props.type)){
			componentClass = this.props.type;
		}
		else{
			type = this.props.type
		}

		//undefined will cause an error
		var value = ""
		if(this.props.value){
			value=this.props.value
		}

		//Strip trailing Z from datetime-local
		if(this.props.type=="datetime-local"){
			value = value.replace("Z","")
		}

		//React doesn't allow null as the defaultValue
		var defaultValue = ""
		if(this.props.defaultValue){
			defaultValue = this.props.defaultValue
		}

		return(
			<FormGroup>

				<ControlLabel style={{color:'lightgray'}}>
						{this.props.label.toUpperCase()}
				</ControlLabel>

				<FormControl
					disabled={this.props.readOnly}
					id={this.props.id}
					type={type}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					componentClass={componentClass}
					defaultValue={this.props.defaultValue}
					value={value}/>

			</FormGroup>
		);
	}
}
