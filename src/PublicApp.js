import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom';
//Import public apps
import MenuPrivate from './MenuPrivate';
import PublicAppOne from './PublicApp1';
import PublicAppTwo from './PublicApp2';

class PublicApp extends Component {
  render() {
    return (
			<div>
				<MenuPrivate/>			
				<Grid>
					<Row>
						<Col md={12}>
							<Switch>
								<Route path='/public/app-1' component={PublicAppOne}/>
								<Route path='/public/app-2' component={PublicAppTwo}/>
							</Switch>
						</Col>
					</Row>
				</Grid>
			</div>

	);
  }
}

export default PublicApp;