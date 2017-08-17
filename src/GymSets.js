import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import ApiTable from './ApiTable';

class GymSets extends React.Component {
	
	
	endpoint = '/gym/sets/';
	
	render() {		
		return (			
		  <div>
			<h1>Gym Sets</h1>
			<legend></legend>
			<Row>
				<Col md={12}>
					<ApiTable endpoint={this.endpoint}/>
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GymSets;