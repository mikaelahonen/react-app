import React, { Component } from 'react';
import {Grid, Row, Col, Navbar, MenuItem, Nav, NavDropdown, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from  'react-fontawesome';

class MenuPrivate extends Component {
	
	wrapperStyle = {		
		top: '0px', 
		height: '56px', 
		width: '100%',
		backgroundColor: '#5cb85c',
		margin: '0px',
		color: 'white',
	}
	
	btnStyle = {

		display: 'inline-block',
		cursor: 'pointer',
		fontSize: '24px',
		paddingTop: '14px',
		paddingBottom: '14px',
	}
	
	spanStyle = {
		fontSize: '24px',
		lineHeight: '24px',
		paddingTop: '14px',
		paddingBottom: '14px',
	}
	
	
	render() {
		
		
		
		var path = window.location.pathname;
		var head = '';
		console.log(path);
		path === "/" ? head = 'Quantified Self App' : head = path;
		
		return (	
		
		
		
		<div  style={this.wrapperStyle}>
			<Grid>
				<Row>
					<Col xs={1}>
						<div><FontAwesome 
							style={this.btnStyle}
							name="bars"
							onClick={() => this.props.clickHandler()}
						/></div>
					</Col>
					<Col sm={11} xsHidden>					
						<div style={this.spanStyle}>{head}</div>
					</Col>
					
				</Row>
			</Grid>
		</div>

		);
		}
	}

export default MenuPrivate;