import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, NavItem,NavDropdown, MenuItem} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';

class MenuScore extends Component { 
	render(){
		return (

				<Nav bsStyle="tabs" justified stacked={false} >
					<LinkContainer exact to='/public/scores/settings'>
						<NavItem  eventKey={1}>SETTINGS</NavItem>
					</LinkContainer>
					
					<LinkContainer exact to='/public/scores/players'>				
						<NavItem  eventKey={2}>PLAYERS</NavItem>
					</LinkContainer>
					
					<LinkContainer exact to='/public/scores/game'>				
						<NavItem  eventKey={3}>GAME</NavItem>
					</LinkContainer>				

				</Nav>

		);
	}
 }
 
export default MenuScore;