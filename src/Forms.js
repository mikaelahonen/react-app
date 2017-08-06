import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col, Table, Form, FormControl, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';

class FormWorkout extends React.Component {

	handleSubmit(e){
		console.log("Submit");
		e.preventDefault();
	}
	
	render() {
		
		return (			

				<form onSubmit={this.handleSubmit}>
				
					<FormGroup>
						<ControlLabel>Id</ControlLabel>
						<FormControl id="id" type="text" disabled placeholder={1} />
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Workout</ControlLabel>
						<FormControl id="workout" type="text" placeholder="Full body" />
					</FormGroup>
					
					<FormGroup>
						<InputGroup>
							<ControlLabel>Start time</ControlLabel>
						</InputGroup>
						<InputGroup>
							<FormControl type="datetime-local"/>
							<InputGroup.Button><Button>Now</Button></InputGroup.Button>
						</InputGroup>
					</FormGroup>
					
					<FormGroup>
						<InputGroup>
							<ControlLabel>End time</ControlLabel>
						</InputGroup>
						<InputGroup>
							<FormControl type="datetime-local"/>
							<InputGroup.Button><Button>Now</Button></InputGroup.Button>
						</InputGroup>
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Location</ControlLabel>
						<FormControl type="text" placeholder="My gym" />
					</FormGroup>
					
					<Button type="submit">
						Submit
					</Button>
				</form>

		);

	}
}



export default FormWorkout;
