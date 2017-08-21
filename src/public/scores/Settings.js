import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, Col, Row} from 'react-bootstrap';

class ScoreSettings extends Component {
	
	initialState = {
		players: [],
		initialScore: 0,
		targetScore: 100,
		newPlayer: '',
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
	
	handleClear(){
		//This does not work
		localStorage.removeItem('scoreApp');
		this.setState(this.initialState);
		alert("Game data removed from your device.");
		this.initialInput.value = this.initialState.initialScore;
		this.targetInput.value = this.initialState.targetScore;
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
	
	render(){
		return (
			<Row>
				<Col sm={6}>
					<h2>Score</h2>
					<legend></legend>
					 <FormGroup>
						<ControlLabel>Start score</ControlLabel>
						<FormControl
							name='startScore' 
							type='number'
							onChange={(e) => this.handleInitialScoreChange(e)}
							defaultValue = {this.state.initialScore}
							inputRef={ref => {this.initialInput = ref;}}
						/>
					</FormGroup>
					
					 <FormGroup>
						<ControlLabel>Target score</ControlLabel>
						<FormControl
							name='targetScore' 
							type='number'
							onChange={(e) => this.handleTargetScoreChange(e)}
							defaultValue = {this.state.targetScore}
							inputRef={ref => {this.targetInput = ref;}}
						/>
					</FormGroup>
				</Col>
				<Col sm={6}>
					<h2>Game data</h2>
					<legend></legend>
					<ButtonToolbar>
						<Button onClick={()=>this.handleClear()}>Clear game data</Button>
					</ButtonToolbar>	
				</Col>
			</Row>
			
		)
	}
}
				
export default ScoreSettings;