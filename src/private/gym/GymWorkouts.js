import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup} from 'react-bootstrap';
import {getData} from 'functions/Api';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkouts extends React.Component {
	
	
	state = {
		ready: false,
		data: [],
	}
	
	handleDelete(id, event){
		alert('No action yet. Id: ' + id + ', Event: ' + event);
	}
	
	endpoint = '/gym/workouts/';	
	
	renderWorkouts(data){
		var items = [];
		data.map((workout, index) => {
			var item = 
			<Panel 
				key={index} 
				header={workout.name}
			>
				<p><FontAwesome name="hashtag"/> Id: {workout.id}</p>
				<p><FontAwesome name="th-list"/> Sets: {workout.sets.length}</p>
				<p><FontAwesome name="calendar"/> Start time: {workout.start_time}</p>
				<p><FontAwesome name="calendar"/> End time: {workout.end_time}</p>
				<p><FontAwesome name="map-marker"/> Location: {workout.location}</p>
				
				<ButtonToolbar>
		
						<LinkContainer to={'/gym/workouts/' + workout.id}>
							<Button bsStyle="success">
								<FontAwesome name="arrow-right"/>
								&nbsp;
								Go
							</Button>
						</LinkContainer>
			
						<LinkContainer to={'/gym/workouts/' + workout.id + '/edit'}>
							<Button bsStyle="primary">
								<FontAwesome name="edit"/>
								&nbsp;
								Edit
							</Button>
						</LinkContainer>


						<Button bsStyle="danger" onClick={(event) => this.handleDelete(workout.id, event)}>
							<FontAwesome name="remove"/>
							&nbsp;
							Delete
						</Button>

				
				</ButtonToolbar>

			</Panel>
			items.push(item);
		});
		return items;
	}
	
	componentDidMount(){

		var data = getData(this.endpoint)
		.then((json)=>{
			var data = json;		
			this.setState({
				data: data,
				ready: true
			});
		});


	}

	render() {
		
		var data = undefined;
		if(this.state.ready){
			data = this.renderWorkouts(this.state.data);		
		}else{
			data = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}
		
		console
		
		return (			
		  <div>

			<Row>
				<Col md={12}>
				<FormGroup>
					<Link to='/gym/workouts/add'>
						<Button bsStyle="success">
							<FontAwesome name="plus"/>
							&nbsp;
							Add
						</Button>
					</Link>
				</FormGroup>
				
					{data}
				</Col>
			</Row>
		  </div>
		)
	}
}



 
export default GymWorkouts;