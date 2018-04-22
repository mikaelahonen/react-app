import React, { Component } from 'react';
import {Col, Table, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Auth} from 'aws-amplify';

class User extends Component {

	state = {
		readyUser: false,
		readySession: false,
		session: {},
		user: {
			id: undefined,
			username: undefined,
			attributes:{
				email: undefined,
				phone_number: undefined
			}
		}
	}

	renderUserData(){
		return(
			<div>
				<h2>User details</h2>
				<legend></legend>
				<Table>
					<thead>
						<tr>
							<th>Description</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Cognito id</td><td>{this.state.user.id}</td>
						</tr>
						<tr>
							<td>Cognito username</td><td>{this.state.user.username}</td>
						</tr>
						<tr>
							<td>Email</td><td>{this.state.user.attributes.email}</td>
						</tr>
						<tr>
							<td>Phone number</td><td>{this.state.user.attributes.phone_number}</td>
						</tr>
					</tbody>
				</Table>

			</div>
		);
	}

	renderSessionData(){
		return(
			<div>
				<h2>Cognito id token</h2>
				<FormGroup controlId="formControlsTextarea">
					<ControlLabel>Id Token</ControlLabel>
					<FormControl componentClass="textarea" readOnly value={this.state.session.idToken.jwtToken} />
				</FormGroup>
			</div>
		)
	}

	async getSession(){
		let session = await Auth.currentSession();
		this.setState({session: session, readySession: true});
		console.log(session)
	}

	async getInfo(){
		try{
			let user = await Auth.currentUserInfo();
			this.setState({user: user, readyUser: true});
		}
		catch(e){
			console.log(e);
		}
	}

	componentDidMount(){
		this.getInfo();
		this.getSession();
	}

	render() {

		var userSection = <p>Getting user data...</p>
		if(this.state.readyUser){
			userSection = this.renderUserData();
		}

		var sessionSection = <p>Getting session data...</p>
		if(this.state.readySession){
				sessionSection = this.renderSessionData();
		}

		return (
			<div>
				{userSection}
				{sessionSection}
			</div>
		);
	}
}

export default User;
