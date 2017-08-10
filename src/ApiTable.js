import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';
import {Table} from 'react-bootstrap';
import {getData} from './Api';
import { Link } from 'react-router-dom';

class Thead extends React.Component{
	render(){
		const cells = this.props.head.map((cell, index) =>
			<th key={cell} data-col={index}>{cell}</th>
		);
		return (
			<thead>
				<tr>
					{cells}
				</tr>
			</thead>
		);
	}
}

class Trow extends React.Component{
	

	
	handleClick(e){
		const col = e.target.getAttribute('data-col');
		const row = e.target.getAttribute('data-row');
		const val = e.target.innerHTML;
		
		console.log("Value: ", val);
		console.log("Row: ", row);
		console.log("Col: ", col);
	}
	
	render(){
		var id = this.props.object.id;
		var cells = [];
		for(var key in this.props.object){
			if(key=='id'){				
				var url = this.props.object.url;
				cells = [...cells, <a href={url} target='_blank'>{id}</a>]
			}else if (key!='url'){
				cells = [...cells, this.props.object[key]]
			}
		}
		
		var row = cells.map((cell, index) => {
			return <td data-id={id} data-row={this.props.row} data-col={index+1} onClick={this.handleClick} key={index}>{cell}</td>
		});
			
		return(
			<tr>{row}</tr>
		);
	}
}

class Tbody extends React.Component{
	
	handleClick(e){
		const item = e.target;
		console.log("Row clicked: ", item);
	}
	
	render(){		
		var body = this.props.body.map((object, index) => {
			return <Trow onClick={this.handleClick} key={index} row={index+1} object={object}/>
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
		body: [],
		ready: false,
	}
	
	componentWillMount(){
		var body = [];
		var head = [];
		getData('/gym/workouts/')
		.then((json)=>{
			
			//Loop the first object to get heads
			for(var key in json[0]){
				if(key != 'url'){
					head = [...head, key];
				}
			}
			
			for(var object in json){
				body = [...body, object]
			}
			
			this.setState({
				head: head,
				body: json,
				ready: true,
			});
		});
		
		
		
	}
	
	render() {
		if(!this.state.ready){
			return <div><FontAwesome name="circle-o-notch" size="3x" spin/></div>;
		}else{
			return (			
				<Table hover>
					<Thead head={this.state.head} />
					<Tbody body={this.state.body} />
				</Table>
			);
		}
	}
}

export default ApiTable;