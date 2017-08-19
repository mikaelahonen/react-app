import React, { Component } from 'react';
import { Button, Jumbotron, Row, Col, Well, FormGroup, FormControl,Grid} from 'react-bootstrap';
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
		//If value is invalid
		if(value<0 || value>255){
			alert("Value must be in range 0-255");
			target.value = '';
		}
		//Set state
		else{
		
			this.setState({
				[name]: value
			});
			console.log('Changed color');
		}

	}
	
	handleFocus(event) {
		event.target.select();
	}
	
	
	componentWillMount(){
		var initialBG = document.body.style.backgroundColor;
		this.setState({
			initialBG: initialBG,
		});
		
	}
	
	render() {
	  
		//Change background
		var colors = [this.state.r, this.state.g, this.state.b];
		var rgb = 'rgb(x)';	
		rgb = rgb.replace('x',colors.join(','));
		document.body.style.backgroundColor = rgb;
		
		//Change h1 color
		var sum = +this.state.r + +this.state.g + +this.state.b;
		var avg = sum/3;
		var h1style = {}
		avg > 127 ? h1style={color:'black'} : h1style={color:'white'};
		console.log(sum);
		
		
		return (
			<Grid>
				<Row>
					<Col sm={4} smOffset={4}>
						<h1 style={h1style}>RGB</h1>
						 <FormGroup key={1}>
							<FormControl
								name='r' 
								type='number' 
								placeholder={31} 
								onChange={(e) => this.handleChange(e)}
								onFocus={this.handleFocus}

								
							/>
						</FormGroup>
						 <FormGroup key={2}>
							<FormControl
								name='g' 
								type='number' 
								placeholder={3} 
								onChange={(e) => this.handleChange(e)} 
								onFocus={this.handleFocus}

							/>
						</FormGroup>
						 <FormGroup key={3}>
							<FormControl
								name='b' 
								type='number' 
								placeholder={93} 
								onChange={(e) => this.handleChange(e)}
								onFocus={this.handleFocus}						

							/>
						</FormGroup>
					</Col>
				</Row>
			</Grid>
		);
	}
	
	componentWillUnmount(){
		document.body.style.backgroundColor = this.state.initialBG;
	}
}

export default PublicColors;