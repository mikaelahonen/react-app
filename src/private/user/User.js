import React, { Component } from 'react';
import {Col, Table} from 'react-bootstrap';
import {Auth} from 'aws-amplify';

class User extends Component {

	state = {
		ready: false,
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

	async getInfo(){
		try{
			let user = await Auth.currentUserInfo();
			this.setState({user: user, ready: true});
		}
		catch(e){
			console.log(e);
		}
	}

	componentDidMount(){
		this.getInfo();
	}

	render() {

		var view = <p>Getting user data...</p>

		if(this.state.ready){
			view = this.renderUserData();
		}

		return view;
	}
}

export default User;
