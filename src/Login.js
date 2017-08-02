import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col, Table, Form, FormControl, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
		<Grid>
			<Row>
				<Col sm={4}>
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
					
						<FormGroup>
							<ControlLabel>Username</ControlLabel>
							<FormControl id="username" type="text" />
						</FormGroup>
						
						<FormGroup>
							<ControlLabel>Password</ControlLabel>
							<FormControl id="password" type="text" />
						</FormGroup>
						
						<Button type="submit">
							Submit
						</Button>
					</form>
				</Col>
			</Row>
		</Grid>
	);
  }
}

export default Login;