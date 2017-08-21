import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';

class ScoreGame extends Component {
	//Functions for Game tab
	handlePoints(){
		console.log('Handle points');
	}
	
	handleScoreDelete(playerIndex, scoreIndex, e){
		console.log("Delete: ", playerIndex, "-", scoreIndex);
		var tempPlayers = this.state.players;
		var score = tempPlayers[playerIndex].score
		score.splice(scoreIndex, 1);
		tempPlayers[playerIndex].score = score;
		tempPlayers[playerIndex].scoreInput = 0;
		
		this.setState({
			players: tempPlayers,
		});

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
		//To do: Remove player's scoreInput
		this.setState({players: tempPlayers});
	}
	
	componentWillMount(){
		this.setState(JSON.parse(localStorage.scoreApp));
		
	}

	componentWillUnmount(){
		localStorage.scoreApp = JSON.stringify(this.state);
	}	
	
	render(){

		//Create score columns to Game tab
		var playerScores = [];
		this.state.players.map((player, playerIndex)=>{
			
			//variables
			var sum = 0;			
			var sumStyle = {};
			var scores = [];
			
			//Count total sum			
			if(player.score.length!==0){				
				sum = player.score.reduce( (prev, curr) => prev + curr );
			}
			
			//Add to initial score or substract from initial score
			var initialScore = Number(this.state.initialScore);
			var targetScore = Number(this.state.targetScore);
			var countUp = initialScore < targetScore;
			if(countUp){
				sum = initialScore + sum;
			} else {
				sum = initialScore - sum;
			}			
			
			//Set distinct style for winner score
			var isAbove = sum >= targetScore;
			var isBelow = sum <= targetScore;
			if((countUp && isAbove) || (!countUp && isBelow)){
				sumStyle={backgroundColor: '#5cb85c', color: 'white'}
			}				
			
			//For loop wouldn't work
			player.score.map((score, scoreIndex)=>{				
				var scoreButton = 
					<FormGroup key={scoreIndex}>
						<Button onClick={(e) => this.handleScoreDelete(playerIndex, scoreIndex, e)}>
							{player.score[scoreIndex]}
							&nbsp;&nbsp;&nbsp;&nbsp;
							<FontAwesome style={{color: 'lightgray'}} name="times"/>
						</Button>
					</FormGroup>
				scores.push(scoreButton);
			});
			
			var playerScore=
				<div key={playerIndex} style={{display: 'inline-block', width: '150px', marginRight: '10px', verticalAlign:'top'}}>
					<h3>{player.name}</h3>
					<FormGroup>
						<InputGroup>
							<FormControl type='number'onChange={(e) => this.handleScoreInputChange(playerIndex, e)}/>
							<InputGroup.Button>
								<Button onClick={() => this.handleScoreInputAdd(playerIndex)}>+</Button>
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
			<div style={{textAlign:'center'}}>
				{playerScores}
			</div>
		)			
	}
}

export default ScoreGame;