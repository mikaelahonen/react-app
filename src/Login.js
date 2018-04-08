import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormControl, FormGroup} from 'react-bootstrap';
import {postData} from 'functions/Api';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {AWS} from 'aws-sdk'
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

class Login extends Component {

	successRedirect = "/gym/workouts"

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

		postData('/api-token-auth/', body).then((json) => {
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

	handleCognito(){
		var authenticationData = {
        Username : this.state.username,
        Password : this.state.password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : 'eu-west-1_H5mb08BMU', // Your user pool id here
        ClientId : '46bf3oa91k0ff16vduo7lolv82' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : this.state.username,
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
			},
	    onFailure: function(err) {
	        alert(err.message || JSON.stringify(err));
	    },

  	});
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
			return <Redirect to={this.successRedirect} />
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
										<Button block onClick={() => this.handleCognito()}>Cognito Auth</Button>
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
