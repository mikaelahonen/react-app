 //React
import React, { Component } from 'react';
import 'css/style.css';
//Bootstrap
import { Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route, Redirect} from 'react-router-dom';
//Components
import MenuSide from 'private/MenuSide';
import MenuPrivate from 'private/Menu';
import Home from 'private/Home';
import GymRouter from 'private/gym/GymRouter';
import User from 'private/user/User';
import Cognito from 'functions/Cognito'
//AWS Amplify
import {Auth} from 'aws-amplify';

class PrivateRouter extends Component {

	state = {
		menu: false,
		auth: undefined,
	}

	//Show or hide menu
	handleMenu(){
		this.setState({
			menu: !this.state.menu
		});
	}

	renderAuthTrue(){

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
		)
	}

	renderAuthFalse(){
		return <Redirect to="/login-cognito"/>;
	}

	async componentDidMount(){
		var auth = await Cognito.isAuthenticated()
		this.setState({auth: auth})
	}

	render() {

		var view = <p>Authenticating...</p>;

		if(this.state.auth!=undefined){
			if(this.state.auth){
				view = this.renderAuthTrue();
			}else{
				view = this.renderAuthFalse();
			}
		}

		return view;
	}

}

export default PrivateRouter;
