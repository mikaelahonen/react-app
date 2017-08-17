import React, { Component } from 'react';
import {Col, Table} from 'react-bootstrap';
import {getTokenExpDate} from './Api';
//React Router
//Gym components



class User extends Component {
	
	state = {
		userid: "Missing",
		email: "Missing",
		firstname: "Missing",
		lastname: "Missing",

	}
	
	componentWillMount(){
		
		fetch('http://localhost:8000/users/current/',{
			mode: "cors",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  'Authorization': 'JWT ' + localStorage.token,
			},	
		})
		.then((response) => response.json())
		.then((json) => {
			var email = json.email;
			var firstname = json.firstname;
			var lastname = json.lastname;
			var userid = json.id;
			this.setState({
				userid: userid,
				email: email,
				firstname: firstname,
				lastname: lastname,
			})
		})
	}
	
	render() {

		return (
			<div>
				<h1>User</h1>
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
							<td>User id</td><td>{this.state.userid}</td>
						</tr>
						<tr>
							<td>First name</td><td>{this.state.firstname}</td>
						</tr>
						<tr>
							<td>Last name</td><td>{this.state.lastname}</td>
						</tr>
						<tr>
							<td>Email</td><td>{this.state.email}</td>
						</tr>
						<tr>
							<td>Token:</td><td>{localStorage.token.substring(1,50)}...</td>
						</tr>
						
						<tr>
							<td>Expiration:</td><td>{getTokenExpDate().toLocaleString()}</td>
						</tr>
					</tbody>
				</Table>
				
			</div>
		);
	}
}

export default User;