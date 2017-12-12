import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, Table} from 'react-bootstrap';
import {getData, deleteData} from 'functions/Api';
import {utcToDate, utcDuration} from 'functions/Functions';
import {Loading, TableFrame, TableRow, Btn, PageTitle} from 'components/Components';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkouts extends React.Component {

	state = {ready: false, data: {}}

	getWorkouts(){
		var endpoint = '/gym/workouts/';
		getData(endpoint).then(data => {
			var state = {data: data, ready: true};
			this.setState(state);
		});
	}

	handleDelete(id, event){
		var ans  = window.confirm('Are you sure you want to delete this workout?')
		if (ans) {
			var endpoint = '/gym/workouts/' + id + '/';
			deleteData(endpoint).then((json)=>{
				this.props.history.push();
			});
		}
	}

	getDuration(start_time, end_time){
		var duration = utcDuration(start_time, end_time)
		if(!end_time){
			duration = "Not ended"
		}else if(duration==0){
			duration = "Zero!"
		}else if(duration<0){
			duration = "Negative!"
		}
		else if(duration>180){
			duration = ">3h"
		}
		return duration
	}

	renderRows(){
		var items = [];
		this.state.data.map((workout, index) => {

			var linkShow = '/gym/workouts/' + workout.id;
			var btnShow = <Btn to={linkShow} bsStyle="success" icon="arrow-right"/>

			var linkEdit = '/gym/workouts/' + workout.id + '/edit';
			var btnEdit = <Btn to={linkEdit} icon="edit"/>

			var btnDelete = <Btn icon="trash" onClick={(event) => this.handleDelete(workout.id, event)} />

			var values = [
				btnShow,
				utcToDate(workout.start_time),
				workout.name,
				workout.sets_done + "/" + workout.sets_total,
				this.getDuration(workout.start_time, workout.end_time),
				workout.location,
				btnEdit,
				btnDelete,
			];

			//Color by completeness of the workout
			var completeness = workout.sets_done / workout.sets_total
			var statusStyle = {backgroundColor: ""}
			if(completeness==1){
				statusStyle = {backgroundColor: '#c6efce'}
			}else if(completeness<1 && completeness>0){
				statusStyle = {backgroundColor: '#ffeb9c'}
			}

			var trow = <TableRow style={statusStyle} values={values} key={index}/>

			items.push(trow);

		});

		return items

	}

	componentWillMount(){
		this.getWorkouts();
	}

	componentWillReceiveProps(){
		this.setState(this.state);
		this.getWorkouts();
	}

	render() {

		var heads = ["","Date","Workout","Completed","Duration","Location","",""];
		var rows = [];
		var addLink = '/gym/workouts/add';

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
						<PageTitle title="Workouts" />
						<hr/>
						<TableFrame heads={heads} rows={rows} />
					</Col>
				</Row>
		  </div>
		)
	}
}

export default GymWorkouts;
