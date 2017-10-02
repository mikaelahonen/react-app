import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormControl, FormGroup} from 'react-bootstrap';
import {postData} from 'functions/Api'; 
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
		
		var body = {
			username: username,
			password: password
		}
		
		postData('/api-token-auth/', body)
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
				login_style: {color:"white", border:"2px solid white"}
			})
		});		
	}
	
	
	handleSubmit(){
		if(!!localStorage.token){delete localStorage.token};
		this.getToken();
	}
	
	render() {
		
		var hintStyle = { 	
			textAlign: 'center',
			padding: '5px',
			color: 'white',
		}
		
		var rowStyle = {
			backgroundColor: 'black',
		}
		
		if(this.state.pass){
			return <Redirect to="/" />
		}else{
			return (
				
					<div id="login-bg">
					
					
						<div id="login-form">
						


									<FormGroup controlId="username">
										<FormControl type="text" name="username" placeholder="Username" onChange={this.handleChange} />
									</FormGroup>
									<FormGroup controlId="password">
										<FormControl type="password" name="password" placeholder="Password" onChange={this.handleChange} />
									</FormGroup>
									<FormGroup>
										<Button block onClick={() => this.handleSubmit()}>Sign in</Button>
									</FormGroup>

									<div style={{...hintStyle,...this.state.login_style}}>{this.state.login_hint}</div>
								
									<Link to="/public">Go to public app</Link>

						</div>
					</div>
			
				
			);
		}
	}
}

export default Login;