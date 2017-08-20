import React, { Component } from 'react';
import { Button, Grid, Row, Table, Col, Form, InputGroup, FormGroup, ControlLabel, FormControl, ToggleButtonGroup, ToggleButton, ButtonToolbar, Tabs, Tab, Nav, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class Scores extends Component {
	
	state = {
		players: [],
		initialScore: 0,
		targetScore: 100,
	}
	
	//Functions for Settings tab
	handleInitialScoreChange(e){
		var value = e.target.value;
		this.setState({
			initialScore: value,
		});
	}
	
	handleTargetScoreChange(e){
		var value = e.target.value;
		this.setState({
			targetScore: value,
		});
	}
	
	handleSave(){
		localStorage.scoreApp = JSON.stringify(this.state);
		alert("Game data saved to your device.");
	}
	
	handleLoad(){
		if(!!localStorage.scoreApp){
			var load = JSON.parse(localStorage.scoreApp);
			this.setState(load);
			alert("Game data loaded from your previous save.");
		}else{
			alert("Saved game not found.");
		}
	}
	
	handleClear(){
		localStorage.removeItem('scoreApp');
		alert("Game data removed from your device.");
	}
	
	
	//Fucntion for Players tab
	handleNewPlayerChange(e){
		const target = e.target;
		const value = target.value;
		this.setState({
			newPlayer: value
		});		
	}
	
	handleNewPlayerAdd(){
		var newPlayer = {
			name:this.state.newPlayer,
			score:[],
			scoreInput: undefined,
		};
		var players = this.state.players;
		players.push(newPlayer);
		this.setState({
			players: players,
		});
		
		//Clear input and focus
		var input = document.getElementById('newPlayerInput');
		input.focus();
		input.value = '';
	}
	
	handlePlayerDelete(i){
		var verified = window.confirm('Delete?');
		if(verified){
			var tempPlayers = this.state.players; 
			tempPlayers.splice(i,1);
			this.setState({players: tempPlayers});
		}
		
	}
	
	
	//Functions for Game tab
	handlePoints(){
		console.log('Handle points');
	}
	
	handleScoreInputChange(i, e){
		var tempPlayers = this.state.players;
		tempPlayers[i].scoreInput = e.target.value;
		this.setState({players: tempPlayers});
		
	}
	
	handleScoreInputAdd(i){
		var scoreInput = Number(this.state.players[i].scoreInput);
		var tempPlayers = this.state.players;
		tempPlayers[i].score.push(scoreInput);
		this.setState({players: tempPlayers});
	}
	
	
	render() {
		
		//Create player buttons to Players tab
		var players = [];
		this.state.players.map((player, index)=>{
			players.push(
				<Button key={index} onClick={() => this.handlePlayerDelete(index)}>
					{player.name}&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesome style={{color: 'lightgray'}} name="times"/>
				</Button>
			);
		});
		
		//Create score columns to Game tab
		var playerScores = [];
		this.state.players.map((player, index)=>{
			
			//variables
			var sum = 0;			
			var sumStyle = {};
			var scores = [];
			
			//Count total sum			
			if(player.score.length!==0){				
				sum = player.score.reduce( (prev, curr) => prev + curr );
			}
			
			//Add to initial score or substract from initial score
			var countUp = this.state.initialScore < this.state.targetScore;
			if(countUp){
				sum = Number(this.state.initialScore) + sum;
			} else {
				sum = Number(this.state.initialScore) - sum;
			}			
			
			//Set distinct style for winner score
			var isAbove = sum >= this.state.targetScore;
			var isBelow = sum <= this.state.targetScore;
			if((countUp && isAbove) || (!countUp && isBelow)){
				sumStyle={backgroundColor: '#5cb85c', color: 'white'}
			}				
			
			for (var i = 0; i < player.score.length; i++) {
				var score = 
					<FormGroup>
						<Button key={i}>{player.score[i]}&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesome style={{color: 'lightgray'}} name="times"/></Button>
					</FormGroup>
				scores.push(score);
			}
			
			var playerScore=
				<div key={index} style={{display: 'inline-block', width: '150px', marginRight: '10px', verticalAlign:'top'}}>
					<h3>{player.name}</h3>
					<FormGroup>
						<InputGroup>
							<FormControl type='number'onChange={(e) => this.handleScoreInputChange(index, e)}/>
							<InputGroup.Button>
								<Button onClick={() => this.handleScoreInputAdd(index)}>+</Button>
							</InputGroup.Button>
						</InputGroup>
					</FormGroup>
					<h4 style={sumStyle}>{sum}</h4>
					<legend></legend>
					{scores}
				</div>
			playerScores.push(playerScore);
		});

		
		
		return (
			<Grid>
			{/*Tab container needs id or it will cause an error*/}
				<Tab.Container id="tab-container" defaultActiveKey={1} style={{marginTop: '20px'}}>
					<Row>
						<Col md={12}>
						
							<Nav bsStyle="pills" justified>							  
								<NavItem eventKey={1}>
									Settings
								</NavItem>
								<NavItem eventKey={2}>
									Players
								</NavItem>
								<NavItem eventKey={3}>
									Game
								</NavItem>
							</Nav>

							

						</Col>
						<Col md={12}>
							<Tab.Content animation>
							
								{/*Settings*/}
								<Tab.Pane eventKey={1}>
									
									<h2>Score</h2>
									<legend></legend>
									 <FormGroup>
										<ControlLabel>Start score</ControlLabel>
										<FormControl
											name='startScore' 
											type='number'
											defaultValue={0}
											onChange={(e) => this.handleInitialScoreChange(e)}
										/>
									</FormGroup>
									
									 <FormGroup>
										<ControlLabel>Target score</ControlLabel>
										<FormControl
											name='targetScore' 
											type='number'
											defaultValue={100} 
											onChange={(e) => this.handleTargetScoreChange(e)}
										/>
									</FormGroup>
									
									<h2>Saved game</h2>
									<legend></legend>
									<ButtonToolbar>
										<Button onClick={()=>this.handleSave()}>Save</Button>
										<Button onClick={()=>this.handleLoad()}>Load</Button>
										<Button onClick={()=>this.handleClear()}>Clear</Button>
									</ButtonToolbar>

									
									
								</Tab.Pane>
								
								{/*Add and delete players*/}
								<Tab.Pane eventKey={2}>
									<h2>Add player</h2>
									<legend></legend>
									<Form inline>
										 <FormGroup>
											<ControlLabel>Add player</ControlLabel>
											{' '}
											<FormControl id="newPlayerInput" name='newPlayer' placeholder='Player 1' onChange={(e) => this.handleNewPlayerChange(e)} />
										</FormGroup>
										{' '}
										<Button onClick={(e) => this.handleNewPlayerAdd(e)}>
											Add
										</Button>										
									</Form>
									<h2>Players</h2>
									<ButtonToolbar>{players}</ButtonToolbar>
								</Tab.Pane>
								
								{/*Scoreboard*/}
								<Tab.Pane eventKey={3}>
									<div style={{textAlign:'center'}}>
										{playerScores}
									</div>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Grid>
		);
	}
	

}

export default Scores;