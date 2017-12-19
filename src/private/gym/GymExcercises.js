import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, Table} from 'react-bootstrap';
import {getData, deleteData} from 'functions/Api';
import {utcToDate, utcDuration} from 'functions/Functions';
import {Loading, TableFrame, TableRow, Btn, PageTitle} from 'components/Components';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

class GymExcercises extends React.Component {

	state = {ready: false, data: {}}

	getExcercises(){
		var endpoint = '/gym/excercises/';
		getData(endpoint).then(data => {
			var state = {data: data, ready: true};
			this.setState(state);
		});
	}

	handleDelete(excerciseId, event){
		var ans  = window.confirm('Are you sure you want to delete this excercise?')
		if(ans){
			var endpoint = '/gym/excercises/' + excerciseId + '/';
			deleteData(endpoint).then((json)=>{
				this.props.history.push();
			});
		}
	}

	handleEdit(excerciseId, event){
    console.log(excerciseId)
		var linkEdit = '/gym/excercises/' + excerciseId + '/edit'
		this.props.history.push(linkEdit)
	}

	renderRows(){
		var items = [];
		this.state.data.map((excercise, index) => {
      console.log(excercise.id)
			var btnEdit = <FontAwesome name="edit" onClick={(e) => this.handleEdit(excercise.id, e)} />

			var btnDelete = <FontAwesome name="trash" onClick={(e) => this.handleDelete(excercise.id, e)} />

			var groupLink = '/gym/muscle-group/' + excercise.muscle_group
			var muscleGroup = <Link to={groupLink}>{excercise.muscle_group_name}</Link>

      var excerciseLink = '/gym/excercises/' + excercise.id
			var excerciseName = <Link to={excerciseLink}>{excercise.excercise}</Link>

			var values = [
        muscleGroup,
        excerciseName,
				btnEdit,
				btnDelete,
			];

			var trow = <TableRow values={values} key={index}/>

			items.push(trow);

		});

		return items

	}

	componentWillMount(){
		this.getExcercises();
	}

	componentWillReceiveProps(){
		this.setState(this.state);
		this.getExcercises();
	}

	render() {

		var heads = ["Muscle group","Excercise","",""];
		var rows = [];
		var addLink = '/gym/excercises/add';

		var data = undefined;
		if(this.state.ready){
			rows = this.renderRows();
		}else{
			data = <Loading/>;
		}

		return (
		  <div>
				<Row>
					<Col md={12}>
						<Btn to={addLink} icon="plus" bsStyle="success"/>
						<PageTitle title="Excercises" />
						<hr/>
						<TableFrame heads={heads} rows={rows} />
					</Col>
				</Row>
		  </div>
		)
	}
}

export default GymExcercises;
