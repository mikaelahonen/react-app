import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, postData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import {Btn, PageTitle, TableFrame, TableRow, Loading} from 'components/Components';
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
		postData(endpoint, body).then((json)=>{
			this.props.history.push(redirect);
		});
	}

	renderRoutines(routines){

		//Initiate row items
		var items = [];

		routines.map((routine, index) => {

			var btnSet = <Btn	bsStyle='success' icon='arrow-right'
					onClick={(event) => this.handleStart(routine.id, event)} />

			var routineLink = '/gym/routines/' + routine.id
			var btnSections = <Btn to={routineLink} icon='th-large'/>

			var values = [
					routine.name,
					routine.section_count,
					btnSet,
					btnSections,
			]

				var item = <TableRow key={index} values={values} />

				//Add row item to array
				items.push(item);
		});

		var heads = ["Name","Section count","Start","Sections"];

		return	<TableFrame	heads={heads}	rows={items} />
	}


	componentDidMount(){
		this.getRoutines();
	}

	getRoutines(){
		var routines_promise = getData('/gym/routines/');
		Promise.all([routines_promise]).then(resolved => {

			//routines and sets from promises
			var routines = resolved[0];

			var state = {routines: routines,	ready: true}
			//Set state
			this.setState(state);

		});
	}

	render() {

		var wait = <Loading />

		if(this.state.ready){
			var wait = "";
			var routines = this.renderRoutines(this.state.routines);
		}

		return (
		  <div>
			<Row>
				<Col md={12}>
					<Btn text="Add" icon="plus" bsStyle="success" to="/gym/routines/add"/>
					<PageTitle title="Routines" />
					<hr/>
					{wait}
					{routines}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymRoutines;
