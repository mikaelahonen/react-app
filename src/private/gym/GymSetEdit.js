import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel, Radio, Checkbox} from 'react-bootstrap';
import {getData, deleteData, putData} from 'functions/Api';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymSetEdit extends React.Component {
	
	state = {
		ready: false,
		data: {},
		updateOk: undefined,
	}	
	
	
	
	handleDelete(id, event){
		var endpoint = '/gym/sets/' + id + '/';
		var redirect = '/gym/workouts/' + this.state.data.workout;
		deleteData(endpoint)
		.then((json)=>{
			this.props.history.push(redirect);
		});
	}
	
	handleUpdateReturn(id, event){
		var endpoint = '/gym/sets/' + id + '/';
		var redirect = '/gym/workouts/' + this.state.data.workout;
		putData(endpoint, this.state.data)
		.then((json)=>{
			this.props.history.push(redirect);
		});		
	}
	
	handleUpdate(id, event){
		this.setState({
			updateOk: ""
		})
		var endpoint = '/gym/sets/' + id + '/';
		putData(endpoint, this.state.data)
		.then((json)=>{
			this.setState({
				updateOk: "Changes updated!"
			})
		});		
	}
	
	handleInputSelect(event){
		event.target.select();
	}
	
	handleChange(event){

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;		
		
		var inputs = this.state.data;
		inputs[name] = value
		
		this.setState({
			data: inputs,
		});
		
		console.log("Form state: " + this.state.data);
	}
	
	
	createForm(set){
		
		var form = 
		
			<div>
			
				<form>
					<h3>Set</h3>
					
						<ButtonToolbar>
				
							<Button 
								bsStyle="success" 
								onClick={(event) => this.handleUpdateReturn(set.id, event)}>
								<FontAwesome name="check"/>
								&nbsp;
								Update and return
							</Button>
						
						</ButtonToolbar>
						
						<FormGroup>
							<ControlLabel>Reps</ControlLabel>
							<FormControl
								id="reps"
								type="number"
								placeholder="10"
								defaultValue={this.state.data.reps}
								onChange={(e) => this.handleChange(e)}
								onSelect={(event) => this.handleInputSelect(event)}
								autoFocus
							/>
						</FormGroup>

						<FormGroup>
							<ControlLabel>Weight</ControlLabel>
							<FormControl
							  id="weight"
							  type="number"
							  placeholder="80"
							  defaultValue={this.state.data.weight}
							  onChange={(e) => this.handleChange(e)}
							  onSelect={(event) => this.handleInputSelect(event)}
							/>
						</FormGroup>
						
						<FormGroup>
							<ControlLabel>Comments</ControlLabel>
							<FormControl
							  id="comments"
							  componentClass="textarea"
							  placeholder="Add comments."
							  defaultValue={this.state.data.comments}
							  onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>						
						
					<h3>Details</h3>
					
					<p>
						{this.state.updateOk}
					</p>
					
					<ButtonToolbar>
					
						<Button bsStyle="primary" onClick={(event) => this.handleUpdate(set.id, event)}>
							<FontAwesome name="refresh"/>
							&nbsp;
							Update
						</Button>
					
						<LinkContainer to={'/gym/workouts/' + this.state.data.workout}>
							<Button bsStyle="danger">
								<FontAwesome name="ban"/>
								&nbsp;
								Cancel
							</Button>
						</LinkContainer>
						
						<Button bsStyle="danger" onClick={(event) => this.handleDelete(set.id, event)}>
							<FontAwesome name="remove"/>
							&nbsp;
							Delete
						</Button>
						
						
					</ButtonToolbar>
					
					<FormGroup controlId="done">
						<ControlLabel>Done</ControlLabel>
						<FormControl 
							componentClass="select" 
							id="done" 
							defaultValue={this.state.data.done}
							onChange={(e) => this.handleChange(e)}>
							<option value={true}>True</option>
							<option value={false}>False</option>
						</FormControl>
					</FormGroup>					
					
					<FormGroup>
						<ControlLabel>Id</ControlLabel>
						<FormControl
							readOnly
							id="id"
							type="number"
							placeholder="id"
							value={this.state.data.id}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Workout ({this.state.data.workout_name})</ControlLabel>
						<FormControl
							id="workout"
							type="number"
							placeholder="Bicep and Chest"
							defaultValue={this.state.data.workout}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					

					
					<FormGroup>
						<ControlLabel>Excercise ({this.state.data.excercise_name})</ControlLabel>
						<FormControl
						  id="excercise"
						  type="number"
						  placeholder="9"
						  defaultValue={this.state.data.excercise}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
					<FormGroup>
						<ControlLabel>Workout Order</ControlLabel>
						<FormControl
						  id="workout_order"
						  type="number"
						  placeholder="1"
						  defaultValue={this.state.data.workout_order}
						  onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					
				</form>						
				
			</div>

		return form;
	}
	
	componentWillMount(){
		console.log('will mount');
		this.setState({
			id: this.props.match.params.id
		});
	}
	
	componentWillReceiveProps(nextProps){
		var id = nextProps.match.params.id;
		this.setState({
			ready: false,
			id: id,
		});
		this.getset(id);
	}
	
	componentDidMount(){
		var id = this.props.match.params.id
		this.getset(id);
	}
	
	
	getset(id){
		var data = getData('/gym/sets/' + id + '/')
		.then((json)=>{
			var data = json;		
			this.setState({
				data: data,
				ready: true,
			});
		});
	}

	render() {
		
		var form = undefined;
		if(this.state.ready){
			form = this.createForm(this.state.data);
		}else{
			form = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}
		
		
		return (			
		  <div>
			<h2>set: {this.state.id}</h2>


			<Row>
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/sets/' + this.state.data.prev_id + '/edit'}>
							<Button block><FontAwesome name="caret-left" size="2x"/></Button>
						</Link>
					</FormGroup>
				</Col>
				
				<Col xs={6}>
					<FormGroup>
						<Link to={'/gym/sets/' + this.state.data.next_id + '/edit'}>
							<Button block><FontAwesome name="caret-right" size="2x"/></Button>
						</Link>
					</FormGroup>

				</Col>
			</Row>			

			<Row>
				<Col md={12}>	
					
					{form}
				</Col>
			</Row>
			

		  </div>
		)
	}
}

export default GymSetEdit;
