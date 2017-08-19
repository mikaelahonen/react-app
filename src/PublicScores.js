import React, { Component } from 'react';
import { Button, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, ToggleButtonGroup, ToggleButton, ButtonToolbar, Tabs, Tab, Nav, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class PublicScores extends Component {
	
	state = {
		players: [],
	}
	
	handleChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		//If value is invalid
		if(value<0 || value>255){
			alert("Value must be in range 0-255");
			target.value = '';
		}
		//Set state
		else{
		
			this.setState({
				[name]: value
			});
			console.log('Changed color');
		}

	}
	
	
	componentWillMount(){

		
	}
	
	handleNewPlayerChange(e){
		const target = e.target;
		const value = target.value;
		this.setState({
			newPlayer: value
		});		
	}
	
	handleNewPlayerAdd(){
		var newPlayer = this.state.newPlayer;
		var players = this.state.players;
		players.push(newPlayer);
		this.setState({
			players: players,
		});
	}
	
	render() {
	  
		var players = [];
		this.state.players.map((player, index)=>{
			players.push(<p key={index}>{player}</p>);
		});
		
		
		return (
			<Grid>
				<Tab.Container defaultActiveKey={1} style={{marginTop: '20px'}}>
					<Row>
						<Col sm={3}>
							<Nav bsStyle="pills" stacked>
							  <NavItem eventKey={1}>
								Settings
							  </NavItem>
							  <NavItem eventKey={2}>
								Players
							  </NavItem>
							  <NavItem eventKey={3}>
								Player scores
							  </NavItem>
							  <NavItem eventKey={4}>
								Score
							  </NavItem>
							</Nav>

							

						</Col>
						<Col sm={9}>
							<Tab.Content animation>

								<Tab.Pane eventKey={1}>
									<ControlLabel>Count</ControlLabel>
									
									<ButtonToolbar>										
										<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
											<ToggleButton value={1}>
												Up
											</ToggleButton>
											<ToggleButton value={2}>
												Down
											</ToggleButton>
										</ToggleButtonGroup>
									</ButtonToolbar>

									
									 <FormGroup>
										<ControlLabel>Target score</ControlLabel>
										<FormControl
											name='targetScore' 
											type='number'
											defaultValue={100} 
										/>
									</FormGroup>
									
									
								</Tab.Pane>
								
								
								<Tab.Pane eventKey={2}>
									<Form inline>
										 <FormGroup>
											<ControlLabel>Add player</ControlLabel>
											{' '}
											<FormControl name='newPlayer' placeholder='Player 1' onChange={(e) => this.handleNewPlayerChange(e)} />
										</FormGroup>
										{' '}
										<Button onClick={(e) => this.handleNewPlayerAdd(e)}>
											Add
										</Button>										
									</Form>
									<h2>Players</h2>
									<div>{players}</div>
								</Tab.Pane>
								
								
								<Tab.Pane eventKey={3}>
									Tab 3 content
								</Tab.Pane>
								
								
								<Tab.Pane eventKey={4}>
									Tab 4 content
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Grid>
		);
	}
	

}

export default PublicScores;