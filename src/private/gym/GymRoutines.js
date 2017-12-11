import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, postData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import {Btn, PageTitle} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymRoutines extends React.Component {


	state = {
		ready: false,
		routines: {},
		sets: {},
	}

	handleStart(routineId, event){
		var body = '';
		var endpoint = '/gym/routines/' + routineId + '/start/';
		var redirect = '/gym/workouts';
		postData(endpoint, body)
		.then((json)=>{
			this.props.history.push(redirect);
		});
	}

	renderRoutines(routines){

		//Initiate row items
		var items = [];

		routines.map((routine, index) => {

			var btnSet =
				<Button
					bsStyle='success'
					onClick={(event) => this.handleStart(routine.id, event)}
					>
					<FontAwesome name='arrow-right'/>
				</Button>

			var item =
				<tr key={index}>
					<td>{routine.name}</td>
					<td>{routine.section_count}</td>
					<td>{btnSet}</td>
				</tr>

				//Add row item to array
				items.push(item);
		});

		return(
			<Table responsive>
				<thead>
					<tr>
						<th>Name</th>
						<th>Sections</th>
						<th>Start</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</Table>);
	}


	componentDidMount(){
		this.getAsd();
	}

	getAsd(){
		var routines_promise = getData('/gym/routines/');
		Promise.all([routines_promise]).then(resolved => {

			//routines and sets from promises
			var routines = resolved[0];

			//Set state
			this.setState({
				routines: routines,
				ready: true,
			});

		});
	}

	render() {

		if(this.state.ready){
			var wait = "";
			var routines = this.renderRoutines(this.state.routines);
		}else{
			wait = <FontAwesome name="circle-o-notch" size="3x" spin/>;
		}



		return (
		  <div>
			<Row>
				<Col md={12}>
					<Btn text="Add" icon="plus" bsStyle="success" to="/gym/routines/add"/>
					<PageTitle title="Routines" />
					<hr/>
					Updated 11.12.2017 20:04 test
					{wait}
					{routines}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymRoutines;
