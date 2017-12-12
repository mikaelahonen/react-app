import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, postData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import {Btn, PageTitle, TableFrame, TableRow, Loading} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymSections extends React.Component {


	state = {
		ready: false,
		sections: {},
		sets: {},
	}


	rendersections(sections){

		//Initiate row items
		var items = [];

		sections.map((section, index) => {


			var values = [
					section.id,
					section.index,
					section.excercise,
					section.random_excercise,
					section.sets,
					section.muscle_group,
					section.routine,
				]

				var item = <TableRow key={index} values={values} />

				//Add row item to array
				items.push(item);
		});

		var heads = ["Id","Index","Excercise","Random excercise","Sets","Muscle group","Routine"];

		return	<TableFrame	heads={heads}	rows={items} />
	}


	componentDidMount(){
		this.getSections();
	}

	getSections(){
		var sections_promise = getData('/gym/sections/');
		Promise.all([sections_promise]).then(resolved => {

			//sections and sets from promises
			var sections = resolved[0];

			var state = {sections: sections,	ready: true}
			//Set state
			this.setState(state);

		});
	}

	render() {

		var wait = <Loading />

		if(this.state.ready){
			var wait = "";
			var sections = this.rendersections(this.state.sections);
		}

		return (
		  <div>
			<Row>
				<Col md={12}>
					<Btn text="Add" icon="plus" bsStyle="success" to="/gym/sections/add"/>
					<PageTitle title="sections" />
					<hr/>
					{wait}
					{sections}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymSections;
