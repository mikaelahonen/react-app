import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, Col, Row} from 'react-bootstrap';

class ScoreSettings extends Component {
	
	//Functions for Settings tab
	handleInitialScoreChange(e){
		var value = e.target.value;
		this.setState({
			initialScore: value,
		});
		console.log('cfsad');
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
		var none = {};
		this.setState(none);
		alert("Game data removed from your device.");
	}
	
	componentWillMount(){
		this.setState(JSON.parse(localStorage.scoreApp));
	}
	
	componentWillUnmount(){
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
						/>
					</FormGroup>
					
					 <FormGroup>
						<ControlLabel>Target score</ControlLabel>
						<FormControl
							name='targetScore' 
							type='number'
							onChange={(e) => this.handleTargetScoreChange(e)}
							defaultValue = {this.state.targetScore}
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