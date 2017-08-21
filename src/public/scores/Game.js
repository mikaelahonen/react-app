import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';

class ScoreGame extends Component {
	
	//Store input elements here
	inputs = [];
	
	//Click to delete score
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
	
	//Store score to players state when input changes
	handleScoreInputChange(i, e){
		var tempPlayers = this.state.players;
		tempPlayers[i].scoreInput = e.target.value;
		this.setState({players: tempPlayers});		
	}

	//Add score to player when enter is pressed
	handleKey(playerIndex, e){
		console.log(playerIndex);
		//Apply tab press only if text field has some text
		var tabAndText = e.key === 'Tab' && e.target.value !== ''
		
		if (e.key === 'Enter' || tabAndText) {

			var value = Number(this.state.players[playerIndex].scoreInput);
			var tempPlayers = this.state.players;
			tempPlayers[playerIndex].score.push(value);
			
			//Set scoreInput property to 0
			tempPlayers[playerIndex].scoreInput = 0;
			//To do: Remove player's scoreInput
			this.setState({players: tempPlayers});
			
			//Clear current input
			e.target.value = '';
			
			//Get next player and set focus
			var nextPlayer = this.nextPlayer(); 
			this.inputs[nextPlayer].focus();
			e.preventDefault();
			
		} 
		//If Tab was pressed on last player's input and it was empty -> Go to first
		else if(e.key === 'Tab' && playerIndex===this.state.players.length-1){
			this.inputs[0].focus();
			e.preventDefault();
		}
		
		
	}
	
	nextPlayer(){
		var players = this.state.players;

		var leastRoundsPlayer = 0;
		var leastRounds = players[0].score.length;
		for(var i=1; i < players.length; i++){
			var playerRounds = players[i].score.length;
			if(playerRounds < leastRounds){
				leastRoundsPlayer = i;
				leastRounds = playerRounds;
			}
		}
		return leastRoundsPlayer;

	}
	
	//Load data from local storage
	componentWillMount(){
		if(!!localStorage.scoreApp){
			this.setState(JSON.parse(localStorage.scoreApp));
		}
	}
	
	//Update data to localstorage
	componentDidUpdate(){
		localStorage.scoreApp = JSON.stringify(this.state);
	}	
	
	
	countUp(){				
		//Count up or down?
		var initialScore = Number(this.state.initialScore);
		var targetScore = Number(this.state.targetScore);
		return initialScore < targetScore;
	}
	
	calculateTotals(){
		
		//Initialize array for score totals
		var totals = [];
		//Take players to an array
		var players = this.state.players;

		
		//Loop all players
		for(var i = 0; i < players.length; i++){
		
			//Initially each player has score of 0
			var total = 0
			
			//Get score array of current player
			var score = players[i].score;
			
			//If players score array is not empty -> total scores
			if(score.length!==0){				
				total = score.reduce( (prev, curr) => prev + curr );
			}
			
			//If count up -> Increase, else decrease
			if(this.countUp()){
				total = Number(this.state.initialScore) + total;
			} else {
				total = Number(this.state.initialScore) - total;
			}
			
			//Push total to totals array
			totals.push(total);
		}
		
		return totals;
	}
	
	isWinner(score){
		var isAbove = score >= this.state.targetScore;
		var isBelow = score <= this.state.targetScore;
		var countUp = this.countUp();
		var countDown = !countUp;
		
		var aboveAndCountUp = countUp && isAbove
		var belowAndCountDown = countDown && isBelow
		
		if(aboveAndCountUp || belowAndCountDown){
			return true;
		}else{
			return false;
		}
	}
	
	calculateRanks(totals){
		
		//Initialize sorted array
		var sorted = [];
		
		//Sort big to small if scores all upwards 
		if(this.countUp()){
			sorted = totals.slice().sort((a,b) => b-a);	
		//Else sort small to big
		} else {
			sorted = totals.slice().sort((a,b) => a-b);	
		}

		//Get ranks by getting indexes from sorted array
		var ranks = totals.slice().map((rank) => sorted.indexOf(rank)+1);
		
		
		return ranks;
	}
	
	render(){

		if(this.state.players.length === 0){
			return <p>Add players to the game.</p>;
		}
		
		
		var totals = this.calculateTotals();
		var ranks = this.calculateRanks(totals);
		var scoreStyle = {backgroundColor: 'rgb(245,245,245)', margin: '10px 5px', padding: '5px', display: 'inline-block', width: '160px', verticalAlign:'top'};
		var wrapperStyle = {textAlign:'left',overflow: 'auto',whiteSpace:'nowrap', textAlign:'center'};
		var playerScores = [];
		var nextPlayer = this.nextPlayer();
		
		
		
		//Loop all players
		this.state.players.map((player, playerIndex)=>{
			
			//variables			
			var winnerHighlight = {};
			var scores = [];
			var countUp = this.countUp();
			var total = totals[playerIndex];
			var rank = ranks[playerIndex];
			var isWinner = this.isWinner(total);
			var turnPointer = '';
			
			if(playerIndex == nextPlayer){
				turnPointer = <FontAwesome style={{color: 'gray'}} name="caret-right"/>
			}
			
			//Set distinct style for winner score			
			if(isWinner){
				winnerHighlight={backgroundColor: '#5cb85c', color: 'white'}
			}				
			
			//Loop score array of the player
			player.score.map((score, scoreIndex)=>{				
				var scoreButton = 
					<FormGroup key={scoreIndex}>
						<Button tabIndex={-1} onClick={(e) => this.handleScoreDelete(playerIndex, scoreIndex, e)}>
							{player.score[scoreIndex]}
							&nbsp;&nbsp;&nbsp;&nbsp;
							<FontAwesome style={{color: 'lightgray'}} name="times"/>
						</Button>
					</FormGroup>
				scores.push(scoreButton);
			});
			
			var playerScore=
				<div key={playerIndex} style={scoreStyle}>
					<h3>{turnPointer} {player.name}</h3>
					<FormGroup>
						<FormControl
							type='number'
							onChange={(e) => this.handleScoreInputChange(playerIndex, e)}
							onKeyDown={(e) => this.handleKey(playerIndex, e)}
							inputRef={ref => {this.inputs[playerIndex] = ref;}}
						/>

					</FormGroup>
					<h4># {rank}</h4>
					<legend></legend>
					<h4 style={{padding: '5px',...winnerHighlight}}>{total}</h4>
					<legend></legend> 
					{scores}
				</div>
			playerScores.push(playerScore);
		});
		
		
	
		return (
			<div style={wrapperStyle}>
				{playerScores}
			</div>
		)	

			
	}
}

export default ScoreGame;