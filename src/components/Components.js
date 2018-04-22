import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';
import {Table, Button, FormGroup, ControlLabel, FormControl, Label, Row, Col, Dropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as moment from 'moment';

export class Loading extends React.Component {
	render() {
		return (
      <FontAwesome name="circle-o-notch" size="3x" spin/>
		);
	}
}

export class PageTitle extends React.Component {
	render(){

		var style = {color:'gray'};
		var text = this.props.title.toUpperCase();
		var title = <h2 style={style}>{text}</h2>

		if(this.props.level==1){
			title = <h1 style={style}>{text}</h1>
		}else if(this.props.level==2){
			title = <h2 style={style}>{text}</h2>
		}else if(this.props.level==3){
			title = <h3 style={style}>{text}</h3>
		}else if(this.props.level==4){
			title = <h4 style={style}>{text}</h4>
		}


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

export class MainTitle extends React.Component {

	render(){

		var style = {color: 'gray', marginBottom: '30px', padding: '0px'};

		var menuItems = []

		this.props.menuItems.map((item, index) => {
			var item =
				<MenuItem key={index} eventKey={index} onClick={item.onClick}>
					{item.text}
				</MenuItem>
				menuItems.push(item)
		});

		return (
			<Row style={style}>
				<Col xs={10}>
					<h2>{this.props.title.toUpperCase()}</h2>
				</Col>
				<Col xs={2} >
					<Dropdown id="main-title-dropdown" className="pull-right">
						<H2Toggle bsRole="toggle">
							<FontAwesome name="ellipsis-v"/>
						</H2Toggle>
						<Dropdown.Menu>
							{menuItems}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
			</Row>
		)
	}
}

class H2Toggle extends React.Component{
	//This class is needed as bsRole="toggle"
	//cannot be used in tags such as h2
	handleClick(e) {
		e.preventDefault();
	}
	render(){
		return (
			<h2 onClick={(e) => this.props.onClick(e)}>
				{this.props.children}
			</h2>
		);
	}
}


export class IconToggle extends React.Component{

	render(){

		var style = {paddingLeft: '10px', paddingRight: '10px'};

		var menuItems = []

		this.props.menuItems.map((item, index) => {
			var item =
				<MenuItem key={index} eventKey={index} onClick={item.onClick}>
					{item.text}
				</MenuItem>
				menuItems.push(item)
		});

		return(
			<Dropdown id="icon-dropdown">
				<div bsRole="toggle" noCaret style={style}>
						<FontAwesome name="ellipsis-v"/>
				</div>
				<Dropdown.Menu>
					{menuItems}
				</Dropdown.Menu>
			</Dropdown>
		)
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

		var tdList = this.props.values.map((value, i) => {
			return <td key={i} style={{color:'gray'}}>{value}</td>
		});
		return tdList;
	}

	render(){
		var values = this.tdWrap();
		var style = this.props.style ? this.props.style : {};
		return (
			<tr onClick={this.props.onClick} style={style}>
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
			<Table hover>
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

					<ControlLabel>
							{this.props.label.toUpperCase()}
					</ControlLabel>

					<FormControl
						id={this.props.id}
						placeholder={this.props.placeholder}
						onChange={this.props.onChange}
						onSelect={this.props.onSelect}
						autoFocus={this.props.autoFocus}
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
			//console.log("value before: " + value)
			value = moment(value).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
			//console.log("value after: " + value)
		}

		//React doesn't allow null as the defaultValue
		var defaultValue = ""
		if(this.props.defaultValue){
			defaultValue = this.props.defaultValue
		}

		return(
			<FormGroup>

				<ControlLabel>
						{this.props.label.toUpperCase()}
				</ControlLabel>

				<FormControl
					disabled={this.props.readOnly}
					id={this.props.id}
					type={type}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					onSelect={this.props.onSelect}
					autoFocus={this.props.autoFocus}
					componentClass={componentClass}
					defaultValue={this.props.defaultValue}
					value={value}/>

			</FormGroup>
		);
	}
}
