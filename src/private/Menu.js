import React, { Component } from 'react';
import { Navbar, MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from  'react-fontawesome';

class MenuPrivate extends Component {
	
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/"><FontAwesome name="home"/></Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>					
						<LinkContainer exact to='/gym'>
							<NavItem eventKey={1}><FontAwesome name="bolt"/> Gym</NavItem>
						</LinkContainer>
					</Nav>
					<Nav pullRight>
						<LinkContainer exact to='/public'>
							<NavItem eventKey={1}><FontAwesome name="mobile"/> Public apps</NavItem>
						</LinkContainer>
						<NavDropdown eventKey={2} title={<span><FontAwesome name="user"/> User</span>} id="basic-nav-dropdown">
							<LinkContainer to='/user'>
								<MenuItem eventKey={2.1}>User</MenuItem>
							</LinkContainer>
							<LinkContainer to='/login'>
								<MenuItem eventKey={2.2}>Login</MenuItem>
							</LinkContainer>
							<LinkContainer to='/logout'>
								<MenuItem eventKey={2.3}>Logout</MenuItem>
							</LinkContainer>
						</NavDropdown>
						{/*<MenuItem eventKey={2} href="/">Link Right</MenuItem>*/}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
		}
	}

export default MenuPrivate;