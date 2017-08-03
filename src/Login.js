import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col, Table, Form, FormControl, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (

		<div id="login-wrap">
		
				<Col lg={3} md={4} sm={6} id="login-form">
				
								<h1>Login</h1>
								<legend></legend>
								<form>
									<FormGroup controlId="formHorizontalUsername">
									
											<FormControl type="text" placeholder="Username" />
						
									</FormGroup>

									<FormGroup controlId="formHorizontalPassword">
										
											<FormControl type="password" placeholder="Password" />
		
									</FormGroup>



									<FormGroup>
								
										<Button type="submit" block >
											Sign in
										</Button>
										
									</FormGroup>
								</form>
							</Col>

				
			
		</div>		

	);
  }
}

export default Login;