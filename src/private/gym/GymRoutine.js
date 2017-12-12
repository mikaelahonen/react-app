import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table} from 'react-bootstrap';
import {getData, postData} from 'functions/Api';
import {distinctValues} from 'functions/Functions';
import {Btn, PageTitle, TableFrame, TableRow, Loading} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymRoutine extends React.Component {


	state = {
		ready: false,
		sections: {},
    routine: {},
		sets: {},
	}


	renderSections(sections){

		//Initiate row items
		var items = [];

		this.state.sections.map((section, index) => {


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

  renderRoutine(){
    var routine = this.state.routine;
    return (
      <Panel>
        <h2>{routine.name}</h2>
        <p>Id: {routine.id}</p>
        <p>Type: {routine.type_name}</p>
      </Panel>
    );
  }


	componentDidMount(){
		this.getAll();
	}

	getAll(){

    var routineId = this.props.match.params.id;

    var routine_promise = getData('/gym/routines/' + routineId)
		var sections_promise = getData('/gym/sections/?routine=' + routineId);

		Promise.all([routine_promise, sections_promise]).then(resolved => {

			//sections and sets from promises
      var routine = resolved[0];
      var sections = resolved[1];

			var state = {routine: routine, sections: sections,	ready: true}
			//Set state
			this.setState(state);

		});
	}

	render() {

		var wait = <Loading />

		if(this.state.ready){
			var wait = "";
			var sections = this.renderSections();
      var routine = this.renderRoutine();
		}

		return (
		  <div>
			<Row>
				<Col md={12}>
          <ButtonToolbar>
            <Btn text="Add" icon="plus" bsStyle="success" to="/gym/sections/add"/>
          </ButtonToolbar>
					{wait}
          {routine}
					{sections}
				</Col>
			</Row>
		  </div>
		)
	}
}

export default GymRoutine;
