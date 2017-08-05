import React, { Component } from 'react';
import { Button, Col, FormControl, FormGroup} from 'react-bootstrap';

import { Redirect } from 'react-router-dom';

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  username: null,
		  password: null,
		  pass: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
		  [name]: value
		});
	}
	
	getToken(){
		console.log("Login username: ", this.state.username);
		var username = this.state.username;
		var password = this.state.password;
		var token = null;
		fetch('http://localhost:8000/api-token-auth/',{
			method: "POST",
			mode: "cors",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})		
		})
		.then((response) => response.json())
		.then((json) => {
			console.log("Fetch token request sent");
			if(json.token){
				console.log("Json token received");
				localStorage.token = json.token;
				this.setState({
					pass: true,
					login_hint: 'Login ok',
					login_style: {border:"2px solid white"}
				});
			}else{
				console.log("Json token not received");
				this.setState({
					pass: false,
					login_hint: 'Wrong credentials.',
					login_style: {border:"2px solid white"}
				});

			}
			
		})
		.catch((error) => {
			console.log("Fetch token error");
			this.setState({
				pass: false,
				login_hint: 'Error!',
				login_style: {color:"red", border:"2px solid red"}
			})
		});		
	}
	
	
	handleSubmit(e){
		if(!!localStorage.token){delete localStorage.token};
		this.getToken();
		e.preventDefault();
	}
	
	render() {
		
		if(this.state.pass){
			return <Redirect to="/" />
		}else{
			return (
				<div id="login-wrap">
					<Col lg={3} md={4} sm={6} id="login-form">
						<h1>LOGIN</h1>
						<legend></legend>
						<form onSubmit={this.handleSubmit}>
							<FormGroup controlId="username">
								<FormControl type="text" name="username" placeholder="Username" onChange={this.handleChange} />
							</FormGroup>
							<FormGroup controlId="password">
								<FormControl type="password" name="password" placeholder="Password" onChange={this.handleChange} />
							</FormGroup>
							<FormGroup>
								<Button type="submit" block >
									Sign in
								</Button>
							</FormGroup>
							<div id="login-hint" style={this.state.login_style}>{this.state.login_hint}</div>
						</form>
					</Col>
				</div>
			);
		}
	}
}

export default Login;