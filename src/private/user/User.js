import React, { Component } from 'react';
import {Col, Table} from 'react-bootstrap';
import {Auth} from 'aws-amplify';

class User extends Component {

	state = {
		user: {
			id: undefined,
			username: undefined,
			attributes:{
				email: undefined,
				phone_number: undefined
			}
		}
	}

	async componentDidMount(){
		let user = await Auth.currentUserInfo();
		this.setState({user: user});
	}

	render() {
		return (
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
}

export default User;
