import React, { Component } from 'react';
import { Button, Jumbotron, Row, Col, Well, FormGroup, FormControl } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class PublicColors extends Component {
	
	state = {
		r: 255,
		g: 255,
		b: 255,
	}
	
	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		console.log('Changed');
	}
	
  render() {
	  

	var colors = [this.state.r, this.state.g, this.state.b];
	var rgb = 'rgb(x)';	
	rgb = rgb.replace('x',colors.join(','));
	document.body.style.backgroundColor = rgb;
	
    return (
		<Row>
			<Col md={4}>
				<h1>RGB</h1>
				 <FormGroup key={1}>
					<FormControl
						name='r' 
						type='number' 
						placeholder={31} 
						onChange={(e) => this.handleChange(e)}
					/>
				</FormGroup>
				 <FormGroup key={2}>
					<FormControl
						name='g' 
						type='number' 
						placeholder={3} 
						onChange={(e) => this.handleChange(e)} 
					/>
				</FormGroup>
				 <FormGroup key={3}>
					<FormControl
						name='b' 
						type='number' 
						placeholder={93} 
						onChange={(e) => this.handleChange(e)} 
					/>
				</FormGroup>
			</Col>
		</Row>
	);
  }
}

export default PublicColors;