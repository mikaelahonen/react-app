import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { Button, Grid, Row, Table, Col, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

import MenuScore from 'public/scores/Menu';
import ScoreSettings from 'public/scores/Settings';
import ScorePlayers from 'public/scores/Players';
import ScoreGame from 'public/scores/Game';

class Scores extends Component {
	
	state = {
		players: [],
		initialScore: 0,
		targetScore: 100,
	}	
	
	render() {		
		return (
			<Grid id="container">
				<Row>
					<Col md={12}>
						<MenuScore/>
						<Switch>								
							<Route path='/public/scores/players' component={ScorePlayers}/>
							<Route path='/public/scores/game' component={ScoreGame}/>
							<Route path='/public/scores' component={ScoreSettings}/>
						</Switch>
					</Col>
				</Row>
			</Grid>
		);
	}
	

}

export default Scores;