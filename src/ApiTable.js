import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {getData} from './Api';
import FontAwesome from  'react-fontawesome';

//Combine all these

class Thead extends React.Component{

	
	render(){
		//Insert an empty th for bulk edit
		const cells = [];
		this.props.head.map((cell, index) => {
			var th = <th key={cell} data-col={index}>{cell.replace("_"," ").toUpperCase()}</th>;
			cells.push(th);
		});
		return (
			<thead>
				
				<tr>
					<th><input type="checkbox"/></th>
					{cells}
				</tr>
			</thead>
		);
	}
}

class Trow extends React.Component{
	
	handleClick(e){
		var id = e.currentTarget.getAttribute('data-id');
		console.log('Handle row click');
		e.preventDefault();
	}
		
	render(){
		var id = this.props.object.id;
		var cells = [];
		for(var key in this.props.object){
			if(key==='id'){				
				var url = this.props.location + '/' + id;
				cells = [...cells, id]
			}else if (key!=='url'){
				cells = [...cells, this.props.object[key]]
			}
		}
		
		var row = cells.map((cell, index) => {
			return <td key={index}>{cell}</td>
		});
			
		return(
			<tr data-id={id} onClick={(e) => this.handleClick(e)}>
				<td><input type="checkbox"/></td>
				{row}
			</tr>
		);
	}
}

class Tbody extends React.Component{
	
	render(){		
		var body = this.props.body.map((object, index) => {
			return <Trow key={index} row={index+1} object={object}/>
		});
		
		return (
			<tbody>
				{body}
			</tbody>
		);
	}
}

class ApiTable extends React.Component {
	
	state = {
		head: [],
	}
	
	componentWillMount(){
		
		//Get data
		var data = [];
		var head = [];
		data = getData(this.props.endpoint)
		.then((json)=>{
			var data = json;
			
			//Loop the first object to get heads
			for(var key in data[0]){
				if(key !== 'url'){
					head = [...head, key];
				}
			}			
			
			this.setState({
				data: data,
				head: head,
				ready: true
			});
		});


	}
	
	render() {
		
		var spinner = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		var table = <div>{spinner}</div>;
				
		if(this.state.ready){
			//Render data table
			table= <Table hover striped>
					<Thead head={this.state.head} />
					<Tbody body={this.state.data} />
				</Table>				
			console.log('This.state.ready');			
		}
		
		
		return (
			<div>
				{table}
			</div>
		);
	}
}

export default ApiTable;