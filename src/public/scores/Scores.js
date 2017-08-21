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
	
	initialState = {
		players: [],
		initialScore: 0,
		targetScore: 100,
		newPlayer: '',
	}	
	
	componentWillMount(){
		console.log('State: ', this.state);
		if(localStorage.getItem('scoreApp') === null) {
			localStorage.scoreApp = JSON.stringify(this.initialState);
		}
	}
	
	componentWillUnmount(){
		var verify  = window.confirm('Save changes before leaving?');
		if(verify){
			localStorage.scoreApp = JSON.stringify(this.initialState);
		}
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