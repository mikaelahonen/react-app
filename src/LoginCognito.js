import React, { Component } from 'react';
import { Button, FormControl, FormGroup} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Amplify, {Auth} from 'aws-amplify';
import Cognito from 'functions/Cognito';
import Config from 'functions/Config';

class LoginCognito extends Component {

	state = {
		username: null,
		password: null,
		auth: false,
		ready: false,
	};


	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
		  [name]: value
		});
	}


	async handleLogin(){

    try{
			//Configure the Cognito authentication
			await Amplify.configure({Auth: Cognito.authData});
			//Sign the user in
			await Auth.signIn(this.state.username, this.state.password)
			//Redirect
			this.props.history.push(Cognito.signInRedirect);
		}catch(e){
			//pass
		}
	}

	renderAuthTrue(){
		return <Redirect to={Config.startPath} />;
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

	async auth(){
		try{
			var auth = await Cognito.isAuthenticated()
			this.setState({auth: auth, ready: true})
		}
		catch(e){
			console.log("Auth failed.")
		}
	}

	componentDidMount(){
		this.auth();
	}

	render() {

		var view = <p>Authenticating...</p>;

		if(this.state.ready){
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
