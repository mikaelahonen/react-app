import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, Table} from 'react-bootstrap';
import {getData, deleteData} from 'functions/Api';
import {utcToDate, utcDuration} from 'functions/Functions';
import Loading from 'components/Components';
import {Panel} from 'react-bootstrap';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkouts extends React.Component {


	state = {
		ready: false,
		data: {},
	}

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

	renderWorkouts(data){
		var items = [];
		data.map((workout, index) => {

			var btnShow =
				<LinkContainer to={'/gym/workouts/' + workout.id}>
					<Button bsStyle="success">
						<FontAwesome name="arrow-right"/>
					</Button>
				</LinkContainer>

			var btnEdit =
				<LinkContainer to={'/gym/workouts/' + workout.id + '/edit'}>
					<Button>
						<FontAwesome name="edit"/>
					</Button>
				</LinkContainer>

			var btnDelete =
				<Button onClick={(event) => this.handleDelete(workout.id, event)}>
					<FontAwesome name="remove"/>
				</Button>

			var item =
			<tr key={index}>
				<td>{btnShow}</td>
				<td>{utcToDate(workout.start_time)}</td>
				<td>{workout.name}</td>
				<td>{workout.sets.length}</td>
				<td>{utcDuration(workout.start_time, workout.end_time)}</td>
				<td>{workout.location}</td>
				<td>{btnEdit}</td>
				<td>{btnDelete}</td>
			</tr>
			items.push(item);
		});

		var tbl =
			<Table responsive>
				<thead>
					<tr>
						<th></th>
						<th>Date</th>
						<th>Workout</th>
						<th>Sets</th>
						<th>Duration</th>
						<th>Location</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</Table>

		return tbl;
	}

	renderAddButton(){
		return(
			<FormGroup>
				<Link to='/gym/workouts/add'>
					<Button bsStyle="success">
						<FontAwesome name="plus"/>
						&nbsp;
						Add
					</Button>
				</Link>
			</FormGroup>
		)
	}

	componentWillMount(){
		this.getWorkouts();
	}

	componentWillReceiveProps(){
		this.setState(this.state);
		this.getWorkouts();
	}

	render() {

		var data = undefined;
		if(this.state.ready){
			data = this.renderWorkouts(this.state.data);
		}else{
			data = <Loading/>;
		}

		return (
		  <div>

			<Row>
				<Col md={12}>
					<h2>All workouts</h2>
					{this.renderAddButton()}
					{data}
				</Col>
			</Row>
		  </div>
		)
	}
}




export default GymWorkouts;
