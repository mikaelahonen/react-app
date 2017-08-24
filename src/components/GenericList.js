import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {getData} from 'functions/Api';
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
				var url = '/gym/workouts' + '/' + id;
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

class GenericList extends React.Component {
	

	/*titleFromUrl(){
		var url = this.props.location.pathname;
		//Remove first slash
		url[0] === '/' ? url = url.substring(1) : url = url;
		//Remove trailing slash
		var len = url.length;
		url[len] === '/' ? url.substring(0,len-1) : url = url;
		//Replace middle slashes
		var words = url.split('/');
		for(var i=0; i < words.length ; i++){
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
		}
		var header = words.join(' > ');
		return header;
	}*/
	
	state = {
		ready: false,
	}
	
	componentWillMount(){
		var endpoints = {
			'/gym/workouts': '/gym/workouts/',
			'/gym/sets': '/gym/sets',
			'/gym/excercises': '/gym/excercises/',
			'/gym/musclegroups': '/gym/musclegroups/',
		}
		
		var url = this.props.location.pathname;
		var endpoint = endpoints[url];		
		console.log('Url: ', url);
		console.log('Endpoint: ', endpoint);
		
		this.setState({
			url: url,
			endpoint: endpoint,
		});	
	}
	
	componentDidMount(){
		
		//Get data
		var data = [];
		var head = [];
		var endpoint = this.state.endpoint;
		var data = getData(endpoint)
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
		
		

		
		var model = this.props.match.params.model;
		var caret = <FontAwesome name="caret-right"/>;
		var spinner = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		var table = <div>{spinner}</div>;
				
		if(this.state.ready){
			//Render data table
			table= <Table hover responsive>
					<Thead head={this.state.head} />
					<Tbody body={this.state.data} />
				</Table>				
			console.log('This.state.ready');			
		}
		
		
		return (
			<div>
				<div id="head-area">
					<h2 id="tbl-head">Gym {caret} {model}</h2>
					<Button id="tbl-btn" 
						bsStyle="success" 
						onClick={() => this.props.history.push(this.props.location.pathname +'/add')}
					>
						<FontAwesome name="plus"/>
					</Button>
					<legend></legend>
				</div>
				{table}
			</div>
		);
	}
}

export default GenericList;