import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';
import {Table} from 'react-bootstrap';
import {getData} from './Api';
import { Link } from 'react-router-dom';

class Thead extends React.Component{
	render(){
		const cells = this.props.head.map((cell) =>
			<th key={cell}>{cell}</th>
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
	render(){
		var cells = [];
		for(var key in this.props.object){
			if(key=='id'){
				var id = this.props.object.id;
				var url = this.props.object.url;
				cells = [...cells, <Link to={url}>{id}</Link>]
			}else if (key!='url'){
			cells = [...cells, this.props.object[key]]
			}
		}
		
		var row = cells.map((cell, index) => {
			return <td key={index}>{cell}</td>
		});
			
		
		return(
			<tr>{row}</tr>
		);
	}
}

class Tbody extends React.Component{
	
	render(){		
		var body = this.props.body.map((object, index) => {
			return <Trow key={index} object={object}/>
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