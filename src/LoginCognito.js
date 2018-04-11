import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormControl, FormGroup} from 'react-bootstrap';
import {postData} from 'functions/Api';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Amplify, {Auth} from 'aws-amplify';
import Cognito from 'functions/Cognito';
import Config from 'functions/Config';

class LoginCognito extends Component {

	state = {
		username: null,
		password: null,
		auth: undefined,
	};


	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
		  [name]: value
		});
	}


	handleLogin(){

		//Configure the Cognito authentication
		Amplify.configure({Auth: Cognito.authData});

		//Sign the user in
		Auth.signIn(this.state.username, this.state.password)
    .then((user) => {
			this.props.history.push(Cognito.signInPath);
		})
    .catch((err) => {
			//pass
		});
	}

	renderAuthTrue(){
		return <Redirect to={"/"} />;
	}

	renderAuthFalse(){
		//Render login page
		return (
			<div id="login-bg">

				<div id="login-form">

					<FormGroup controlId="username">
						<FormControl type="text" name="username" placeholder="Username" onChange={(e) => this.handleChange(e)} />
					</FormGroup>
					<FormGroup controlId="password">
						<FormControl type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
					</FormGroup>
					<FormGroup>
						<Button block onClick={() => this.handleLogin()}>Sign in by Amazon Cognito</Button>
					</FormGroup>

					<Link to="/public">Go to public app</Link>

				</div>
			</div>
		);
	}

	async componentDidMount(){
		var auth = await Cognito.isAuthenticated();
		this.setState({auth: auth});
	}

	render() {

		var view = <p>Authenticating...</p>;

		if(this.state.auth!=undefined){
			if(this.state.auth){
				view = this.renderAuthTrue();
			}else{
				view = this.renderAuthFalse();
			}
		}

		return view;
	}
}

export default LoginCognito;
