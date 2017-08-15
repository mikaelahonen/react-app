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
						{/*<MenuItem eventKey={2}>Link</MenuItem>*/}
						<NavDropdown eventKey={1} title={<span><FontAwesome name="bolt"/> Gym</span>} id="basic-nav-dropdown">
							
							<MenuItem header>Home</MenuItem>
							<LinkContainer exact to='/gym'>
								<MenuItem eventKey={1.1}>Gym</MenuItem>
							</LinkContainer>
							
							<MenuItem divider />
							
							<MenuItem header>Templates</MenuItem>
							<LinkContainer to='/gym/workouts'>
								<MenuItem eventKey={1.2}>Workouts</MenuItem>
							</LinkContainer>
							
							<MenuItem divider />
							
							<MenuItem header>Training</MenuItem>
							<MenuItem eventKey={1.3}>...</MenuItem>
							
						</NavDropdown>

					</Nav>
					<Nav pullRight>
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

export default Menu;
