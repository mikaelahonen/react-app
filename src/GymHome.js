import React, { Component } from 'react';
import { Button, ButtonToolbar, Jumbotron, Row, Col, Well } from 'react-bootstrap';
import {withRouter, Link, Route} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class GymHome extends Component {
	
	handleClick(e){
		const url = e.currentTarget.getAttribute('data-url');
		console.log(url);
		this.props.history.push(url);
		e.preventDefault();
	}
	
  render() {
    return (
		<div>
			<Jumbotron>
				<h2>Gym App</h2>
				<p><i>Here you can find gym training utilities.</i></p>
			</Jumbotron>
			<Row>
			
				<Col sm={4}>
				
					<h2><FontAwesome name="list"/> Training</h2>
					<legend></legend>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/workouts')}>Workouts</Button>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/sets')}>Sets</Button>
					</ButtonToolbar>
					
				</Col>
				
				<Col sm={4}>
						
					<h2><FontAwesome name="edit"/> Management</h2>
					<legend></legend>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/excercises')}>Excercises</Button>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/musclegroups')}>Muscle Groups</Button>
					</ButtonToolbar>
					
				</Col>
				
				<Col sm={4}>
					
					<h2><FontAwesome name="file-o"/> Templates</h2>
					<legend></legend>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/plans')}>Plans</Button>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/routines')}>Routines</Button>
						<Button bsStyle="success" onClick={() => this.props.history.push('/gym/sections')}>Sections</Button>
						
					</ButtonToolbar>
					
				</Col>

			</Row>
		</div>
	);
  }
}

export default GymHome;