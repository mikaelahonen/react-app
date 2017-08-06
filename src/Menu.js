import React, { Component } from 'react';
import { Navbar, MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class Menu extends Component {
	
	render() {
		return (
			<Navbar inverse collapseOnSelect fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/"><FontAwesome name="home"/></Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						{/*<NavItem eventKey={2}>Link</NavItem>*/}
						<NavDropdown eventKey={1} title={<span><FontAwesome name="bolt"/> Gym</span>} id="basic-nav-dropdown">
							<MenuItem header>Home</MenuItem>
							<MenuItem eventKey={1.1}><Link to='/gym'>Gym</Link></MenuItem>
							<MenuItem divider />
							<MenuItem header>Templates</MenuItem>
							<MenuItem eventKey={1.2}><Link to='/gym/workouts'>Workouts</Link></MenuItem>
							<MenuItem divider />
							<MenuItem header>Training</MenuItem>
							<MenuItem eventKey={1.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<NavDropdown eventKey={2} title={<span><FontAwesome name="user"/> User</span>} id="basic-nav-dropdown">
							<MenuItem eventKey={2.1}><Link to='/user'>User</Link></MenuItem>
							<MenuItem eventKey={2.2}><Link to='/login'>Login</Link></MenuItem>
							<MenuItem eventKey={2.3}><Link to='/logout'>Logout</Link></MenuItem>
						</NavDropdown>
						{/*<NavItem eventKey={2} href="/">Link Right</NavItem>*/}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
		}
	}

export default Menu;
