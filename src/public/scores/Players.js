import React, { Component } from 'react';
import {FormGroup, Form, FormControl, InputGroup, ControlLabel, Button, ButtonToolbar, Row, Col} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';

class ScorePlayers extends Component {
	
	inputFocus(){
		this.input.focus();
		this.input.value = '';
	}
	
	//Fucntion for Players tab
	handleChange(e){
		const target = e.target;
		const value = target.value;
		this.setState({
			newPlayer: value
		});		
		console.log(value);
	}
	
	handleKey(e){
		if (e.key === 'Enter') {
			this.handleNewPlayer();
		}		
	}
	
	handleNewPlayer(){
		var newPlayer = {
			name:this.state.newPlayer,
			score:[],
			scoreInput: 0,
		};
		var players = this.state.players;
		players.push(newPlayer);
		this.setState({
			players: players,
		});
		
		//Clear input and focus
		this.inputFocus();

	}
	
	handlePlayerDelete(i){
		var verified = window.confirm('Delete?');
		if(verified){
			var tempPlayers = this.state.players; 
			tempPlayers.splice(i,1);
			this.setState({players: tempPlayers});
		}
		
	}	
	
	//Load data from local storage
	componentWillMount(){
		if(!!localStorage.scoreApp){
			this.setState(JSON.parse(localStorage.scoreApp));
		}
	}
	
	componentDidMount(){
		this.inputFocus();
	}
	
	//Update data to localstorage
	componentDidUpdate(){
		localStorage.scoreApp = JSON.stringify(this.state);
	}
	
	render(){

		//Create player buttons to Players tab
		var players = [];
		this.state.players.map((player, index)=>{
			players.push(
				<Button key={index} onClick={() => this.handlePlayerDelete(index)} style={{marginBottom: '10px'}}>
					{player.name}&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesome style={{color: 'lightgray'}} name="times"/>
				</Button>
			);
		});
		
		return (
			<Row>
			
				<Col sm={6}>
					<h2>Add player</h2>
					<legend></legend>

					<FormGroup>
			
							<FormControl 
								id="newPlayerInput" 
								name='newPlayer' 
								placeholder='Player 1' 
								onChange={(e) => this.handleChange(e)}
								onKeyPress={(e) => this.handleKey(e)}
								inputRef={ref => {this.input = ref;}}
							/>
							
					
					</FormGroup>					
				</Col>
				
				<Col sm={6}>
					<h2>Players</h2>
					<legend></legend>
					<ButtonToolbar>{players}</ButtonToolbar>
				</Col>
				
			</Row>
		);
	}
	
}

export default ScorePlayers;