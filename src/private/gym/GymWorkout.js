import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table, ProgressBar, Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {getData, patchData, deleteData} from 'functions/Api';
import {distinctValues, utcToDate, groupBy} from 'functions/Functions';
import {Loading, TableFrame, TableRow, Btn, MainTitle, FormInput} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymWorkout extends React.Component {

	state = {
		ready: false,
		workout: {},
		sets: {},
		excerciseFilter: null,
		expandedId: undefined,
		view: "list",
		modalOpen: false,
		modalSet: undefined,
	}

	handleWorkoutEdit(){
		window.alert('Edit workout');
	}

	handleWorkoutDelete(){
		window.alert('Delete workout. Not implemented.');
	}

	handleSetAdd(){
		this.props.history.push('/gym/sets/add');
	}

	handleExpand(setId, event){
		var state = {expandedId: undefined}
		if(setId != this.state.expandedId){
			state = {expandedId: setId}
		}
		this.setState(state);
	}

	//Filter to excercises of clicked object
	handleFilter(clickedSetId, event){
		var sets = this.state.sets;
		var filterId = sets.filter(set => clickedSetId == set.id)[0].excercise;
		this.setState({
			excerciseFilter: filterId
		});
	}

	//Mark set as done
	handleDelete(setId, event){
		var ans  = window.confirm('Are you sure you want to delete this set?')
		if (ans) {
			var endpoint = '/gym/sets/' + setId + '/';
			deleteData(endpoint).then(response => {
				this.props.history.push();
			});
		}
	}

	handleChangeView(view, event){
		var state = {view: view};
		this.setState(state);
	}

	//Mark set as done
	handleEdit(setId, event){
		this.props.history.push('/gym/sets/' + setId + '/edit');
	}

	//Mark set as done
	handleAnalytics(excerciseId, event){
			this.props.history.push('/gym/excercises/' + excerciseId + '/analytics');
	}

	handleShowAll(event){
		var state = {excerciseFilter: null};
		this.setState(state);
	}

	handleQuickEdit(setId, event){
		window.alert(setId)
	}

	handleModalOpen(set){
		var state = {modalOpen: true, modalSet: set};
		this.setState(state);
	}

	handleModalClose(){
		var state = {modalOpen: false};
		this.setState(state);
	}

	renderDuration(){
		return (
			<Panel>
				<h3>Duration: [mm:ss]</h3>
			</Panel>
		);
	}

	renderToolbar(){
		return (
			<ButtonToolbar>
				<Btn text="Show all" onClick={(event) => this.handleShowAll(event)} />
				<Btn text="Quick view" onClick={(event) => this.handleChangeView("quick", event)} />
				<Btn text="List view" onClick={(event) => this.handleChangeView("list", event)} />
			</ButtonToolbar>
		);
	}

	renderProgressBar(){
		var done = this.state.workout.sets_done
		var total = this.state.workout.sets_total
		var percent = done/total*100
		return(
			<ProgressBar now={percent} label={done + "/" + total} bsStyle="success" />
		)
	}

	renderListView(){

		//Initiate row items
		var items = [];

		this.state.sets.map((set, index) => {

			//Filter excercises
			if(!this.state.excerciseFilter || set.excercise == this.state.excerciseFilter){

				var status = undefined
				if(set.done){
					status = <FontAwesome style={{color:"#5cb85c"}} name='check' />
				}

				var editLink = '/gym/sets/' + set.id + '/edit';
				var excercise =
					<div>
						<Link to={editLink}>{set.excercise_name}</Link>
					</div>

				var numbers = <div>{set.reps + " x " + set.weight + (!set.weight ? '' : ' kg')}</div>

				var actions =
					<Dropdown id="maint-title-dropdown" className="pull-right">
						<Dropdown.Toggle noCaret>
								<FontAwesome name="ellipsis-v"/>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<MenuItem key={index} eventKey={index + 'delete'} onClick={(event) => this.handleDelete(set.id, event)}>
								Delete
							</MenuItem>
							<MenuItem key={index} eventKey={index + 'edit'} onClick={(event) => this.handleEdit(set.id, event)}>
								Edit
							</MenuItem>
							<MenuItem key={index} eventKey={index + 'analytics'} onClick={(event) => this.handleAnalytics(set.excercise, event)}>
								Analytics
							</MenuItem>
							<MenuItem key={index} eventKey={index + 'filter'} onClick={(event) => this.handleFilter(set.id, event)}>
								Filter
							</MenuItem>
						</Dropdown.Menu>
					</Dropdown>

				//Append default values if the row is expanded
				if(this.state.expandedId == set.id){
					excercise =
						<div>
							{excercise}
							<div>
								<i>{set.muscle_group_name}</i>
							</div>
							<div>
								<i>Id {set.id}</i>
							</div>
							<div>
								<i>"{set.comments}"</i>
							</div>
						</div>

					numbers =
						<div>
							{numbers}
							<div>
								<i>{set.orm + " kg"}</i>
							</div>
						</div>
				}

				var values = [
						set.workout_order,
						status,
						excercise,
						numbers,
						actions,
				]

				//<tr key={index}  >
				var item = <TableRow onClick={(event) => this.handleExpand(set.id, event)}
					key={index}	values={values}
				/>

				//Add row item to array
				items.push(item);

			} //end if

		}); //end map

		var heads = ["","","Excercise","Set",""];
		var tableFrame = <TableFrame heads={heads} rows={items} />

		return tableFrame

	} //End function

	renderQuickView(){

		var elementStyle = {
			textAlign: 'center',
		}

		var excerciseStyle = {
			color: 'gray',
		}

		var grouped = groupBy(this.state.sets,"excercise_name");
		var excercises = [];
		for(var excercise in grouped){

			var sets = []
			grouped[excercise].map((set, index) => {

				//set id done?

				var bgColor = 'white';
				var color = 'gray';
				if(set.done){
					bgColor = '#5cb85c';
					color = 'white';
				}

				var setStyle = {
					backgroundColor: bgColor,
					color: color,
					height: '100px',
					paddingTop: '19px',
					borderRadius: '30px',
					marginLeft: '5px',
					marginRight: '5px',
					marginTop: '15px',
					marginBottom: '25px',
					width: '60px',
					height: '60px',
					display: 'inline-block',
					textAlign: 'center',
					border: '1px solid gray',
				}

				var setItem =
					<span style={setStyle} key={index} onClick={() => this.handleModalOpen(set)}>
						{set.reps + "x" + set.weight}
					</span>
				sets.push(setItem)
			})

			var excerciseItem =
				<div style={elementStyle} key={excercise}>
					<h3 style={excerciseStyle}>{excercise}</h3>
					{sets}
				</div>

			excercises.push(excerciseItem)
		}

		return <div>{excercises}</div>;
	}

	renderModal(){
		var modal =
			<Modal show={this.state.modalOpen} onHide={() => this.handleModalClose()}>
				<Modal.Header closeButton>
					<Modal.Title>
						{this.state.modalSet.excercise_name} (#{this.state.modalSet.workout_order})
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<form>
					<FormInput
							id="reps"
							label="Reps"
							type="number"
							value={this.state.modalSet.reps}
							autoFocus
						/>

					<FormInput
							id="weight"
							label="Weight"
							type="number"
							value={this.state.modalSet.weight}
						/>

					<FormInput
							id="comments"
							label="Comments"
							componentClass="textarea"
							value={this.state.modalSet.comments}
						/>
					</form>

					[analytics]
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="success" onClick={() => this.handleModalClose()}>Done</Button>
				</Modal.Footer>
			</Modal>
		return modal
	}

	componentWillMount(){
		this.getAll();
	}

	getAll(){
		var workoutId = this.props.match.params.id;
		var workout_promise = getData('/gym/workouts/' + workoutId + '/');
		var sets_promise = getData('/gym/sets/?workout=' + workoutId + '&ordering=workout_order');

		Promise.all([workout_promise, sets_promise]).then(resolved => {

			//Workouts and sets from promises
			var workout = resolved[0];
			var sets = resolved[1];

			var state = {
				workout: workout,
				sets: sets,
				ready: true,
				excerciseFilter: null,
			}

			//Set state
			this.setState(state);

		});
	}

	render() {

		var workout = "Workout...";
		var progressBar = "";
		var duration = "";
		var view = "Rendering view...";
		var modal = "";

		if(this.state.ready){
			duration = this.renderDuration();
			progressBar = this.renderProgressBar();
			workout = this.state.workout.name;

			//View
			if(this.state.view=="list"){
				view = this.renderListView();
			}else if(this.state.view=="quick"){
				view = this.renderQuickView();
			}

			if(this.state.modalOpen){
				modal = this.renderModal();
			}
		}

		var menuItems = [
			{
				text: 'Edit workout',
				onClick: () => this.handleWorkoutEdit(),
			},
			{
				text: 'Delete workout',
				onClick: () => this.handleWorkoutDelete(),
			},
			{
				text: 'Add set',
				onClick: () => this.handleSetAdd(),
			}

		]

		return (
			<Row>
				<Col md={12}>
					<MainTitle title={workout} menuItems={menuItems} />
					{duration}
					{progressBar}
					{this.renderToolbar()}
					{view}
					{modal}
				</Col>
			</Row>
		)
	}
}

export default GymWorkout;
