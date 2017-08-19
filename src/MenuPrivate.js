import React, { Component } from 'react';
import { Navbar, MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from  'react-fontawesome';

class Menu extends Component {
	
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
						<NavDropdown eventKey={1} title={<span><FontAwesome name="mobile"/> Apps</span>} id="basic-nav-dropdown">							

							
							<LinkContainer exact to='/public/scores'>
								<MenuItem eventKey={1.1}>Scores</MenuItem>
							</LinkContainer>
							
							<LinkContainer exact to='/public/colors'>
								<MenuItem eventKey={1.2}>Colors</MenuItem>
							</LinkContainer>
							
						</NavDropdown>

					</Nav>
					<Nav pullRight>

							<LinkContainer to='/'>
								<NavItem eventKey={2.1}>{<span><FontAwesome name="user"/> Login</span>} </NavItem>
							</LinkContainer>

					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
		}
	}

export default Menu;
