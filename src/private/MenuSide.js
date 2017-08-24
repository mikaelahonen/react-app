import React, { Component } from 'react';
import {Grid, Row, Col, Navbar, MenuItem, Nav, NavDropdown, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from  'react-fontawesome';

class MenuSide extends Component {
	
	sideStyle = {
		height: '100%',
		backgroundColor: 'white',
		width: '250px',
		position: 'absolute',
		zIndex: '998',
		padding: '10px',
		borderRight: '2px solid lightgray',
	}
	
	btnStyle = {
		top: '48%',
		left: '228px',
		border: '2px solid lightgray',
		zIndex: '999',
		cursor: 'pointer',
		textAlign: 'center',
		padding: '5px',
		height: '42px',
		width: '42px',
		float: 'right',
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: '21px',
		color: 'lightgray',
	}
	
	items = [
		{text: 'Home', url: '/', icon: 'home'},
		{text: 'Gym', url: '/gym', icon: 'bolt'},
		{text: 'User', url: '/user', icon: 'user'},
		{text: 'Login', url: '/login', icon: 'sign-in'},
		{text: 'Logout', url: '/logout', icon: 'sign-out'},
		{text: 'Public Apps', url: '/public', icon: 'mobile'},
	]
	
	render(){
		
		var items = [];
		this.items.map((item, index) => {
			item = 
			<LinkContainer exact key={index} to={item.url}>
				<NavItem
					onClick={() => this.props.clickHandler()}
					
					eventKey={index}>
					<FontAwesome name={item.icon}/>
					&nbsp;{item.text}
				</NavItem>
			</LinkContainer>
			items.push(item);
		})
		
		return(
			<div style={this.sideStyle}>

				<Nav bsStyle="pills" stacked activeKey={1}>
					{items}
				</Nav>
				
				<div 
					style={this.btnStyle}
					onClick={() => this.props.clickHandler()}
				>
					<FontAwesome 						
						name="caret-left"
						size='2x'						
					/>
				</div>
			</div>
		);
	}
}


export default MenuSide;
