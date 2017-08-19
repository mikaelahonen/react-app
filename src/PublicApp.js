import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom';
//Import public apps
import MenuPrivate from './MenuPrivate';
import PublicScores from './PublicScores';
import PublicColors from './PublicColors';

class PublicApp extends Component {
  render() {
    return (
			<div>
				<MenuPrivate/>			

					<Switch>
						<Route path='/public/scores' component={PublicScores}/>
						<Route path='/public/colors' component={PublicColors}/>
					</Switch>

			</div>

	);
  }
}

export default PublicApp;