import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col, Table } from 'react-bootstrap';
import Head from './Components';
import GoogleMapsContainer from './GoogleMapsContainer';
import {getLocation} from './GeoLocation';
import {getPosition} from './functions';



class Position extends Component{	

	state = {
		lat: "Not set",
		lng: "Not set",
		acc: "Not set"
	}	
	

	componentWillMount() {
		getLocation()
		.then((pos) => {
			this.setState({
				lat: pos.coords.latitude.toFixed(2),
				lng: pos.coords.longitude.toFixed(2),
				acc: pos.coords.accuracy.toFixed(0)
			});
		});				
	}
	
	render() {
		return(
			<div>
			
				<Table>
					<thead>
						<tr><th>Metric</th><th>Value</th></tr>
					</thead>
					<tbody>					
						<tr><td>Latitude</td><td>{this.state.lat}</td></tr>
						<tr><td>Longitude</td><td>{this.state.lng}</td></tr>
						<tr><td>Accuracy</td><td>{this.state.acc} meters</td></tr>
					</tbody>
				</Table>				
			</div>
		);		
	}
	
}

class Home extends Component {
	
	render() {
		return (
			<div>
				<Head head="Home"/>
				<Jumbotron>
					<h2>Quantiefied Self App</h2>
					<p><i>Welcome!</i></p>
					<Button bsStyle='primary' bsSize='large'>Home button</Button>
				</Jumbotron>
				<h2>Location</h2>
				<Position/>
				<GoogleMapsContainer/>
			</div>
		);
	}
}

export default Home;