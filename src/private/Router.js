 //React
import React, { Component } from 'react';
import 'css/style.css';
//Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom';
//Components
import MenuSide from 'private/MenuSide';
import MenuPrivate from 'private/Menu';
import Home from 'private/Home';
import GymRouter from 'private/gym/GymRouter';
import User from 'private/user/User';

class PrivateRouter extends Component {
	
	state = {
		menu: false
	}
	
	handleMenu(){

		var menu = undefined;
		if(this.state.menu){
			menu = false;
		}else{
			menu = true;
		}

		this.setState({
			menu: menu
		});
	}
	
	render() {
		
	
		var sideMenu = this.state.menu ? <MenuSide clickHandler={() => this.handleMenu()} /> : '';
		
		return (
			<div>
				{sideMenu}
				<MenuPrivate 
					clickHandler={() => this.handleMenu()}
				/>			
				<Grid id="container">
					<Row>
						<Col md={12}>
							<Switch>
								<Route exact path='/' component={Home}/>
								<Route path='/gym' component={GymRouter}/>
								<Route path='/user' component={User}/>
							</Switch>
						</Col>
					</Row>
				</Grid>
				
			</div>
		);
	}
}

export default PrivateRouter;
