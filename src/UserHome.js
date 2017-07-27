import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col, Well } from 'react-bootstrap';
import Head from './Components';
import {Link} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class UserHome extends Component {
  render() {
    return (
		<div>
			<h1>GymHome</h1>
			<Jumbotron>
				<h2>Gym App</h2>
				<p><i>Welcome!</i></p>
			</Jumbotron>
			<Row>
				<Col sm="4">
					<Well className="text-center">
						<h3>Details</h3>
						<p><FontAwesome name="file" size="3x"/></p>
						
					</Well>
				</Col>
				<Col sm="4">
					<Well className="text-center">
						<h3>Logout</h3>
						<p><FontAwesome name="key" size="3x"/></p>
						<Button><Link to='/user/logout'>Go to Workouts</Link></Button>
					</Well>
				</Col>
				<Col sm="4">
					<Well className="text-center">
						<h3>Management</h3>
						<p><FontAwesome name="edit" size="3x"/></p>
					</Well>
				</Col>
			</Row>
		</div>
	);
  }
}

export default UserHome;