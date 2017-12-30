import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, postData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import {Btn, MainTitle, TableFrame, TableRow, Loading} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymRoutines extends React.Component {


	state = {
		ready: false,
		routines: {},
		sets: {},
	}

	handleAddRoutine(){
		window.alert("Not implemented yet")
	}

	handleSectionClick(routineId, event){
		this.props.history.push('/gym/routines/' + routineId)
	}

	handleEdit(routineId, event){
		this.props.history.push("/gym/routines/" + routineId + "/edit")
	}

	handleStart(routineId, event){
		var body = '';
		var endpoint = '/gym/routines/' + routineId + '/start/';
		var redirect = '/gym/workouts';
		postData(endpoint, body).then((json)=>{
			this.props.history.push(redirect);
		});
	}

	renderRoutines(){

		//Initiate row items
		var items = [];

		this.state.routines.map((routine, index) => {

			var btnStart = <FontAwesome name='arrow-right'
				onClick={(event) => this.handleStart(routine.id, event)} />

			var btnEdit = <FontAwesome name='edit'
				onClick={(e) => this.handleEdit(routine.id, e)} />

			var btnSections = <FontAwesome name='th-large'
				onClick={(e) => this.handleSectionClick(routine.id, e)} />

			var values = [
					routine.name,
					routine.section_count,
					btnStart,
					btnSections,
					btnEdit,
			]

				var item = <TableRow key={index} values={values} />

				//Add row item to array
				items.push(item);
		});

		var heads = ["Routine","Section count","","",""];

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
		var routines = "";

		if(this.state.ready){
			var wait = "";
			var routines = this.renderRoutines();
		}

		var menuItems = [
			{
				text: "Add routine",
				onClick: () => this.handleAddRoutine()
			}
		]

		return (
		  <div>
			<Row>
				<Col md={12}>
					<MainTitle title="Routines" menuItems={menuItems} />
					{wait}
					{routines}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymRoutines;
