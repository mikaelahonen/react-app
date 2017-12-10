import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {postData, getData} from 'functions/Api';
import {objectArrayToDict} from 'functions/Functions';
import {FormInput, FormSelect, Btn, PageTitle, Options} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymSetAdd extends React.Component {

	state = {
    data:{},
    excerciseOptions: [],
    workoutOptions: [],
  }

  getOptions(){

    var workoutPromise = getData('/gym/workouts/?fields=id,name,start_time');
    var excercisePromise = getData('/gym/excercises/?fields=id,excercise');

    Promise.all([workoutPromise, excercisePromise]).then(resolved => {
      console.log("Promise all")
			//Workouts and sets from promises
			var workoutOptions = objectArrayToDict(resolved[0], "id", "name");
			var excerciseOptions = objectArrayToDict(resolved[1], "id", "excercise");

      var state = {
        workoutOptions: workoutOptions,
        excerciseOptions: excerciseOptions,
        ready: true,
      }

			//Set state
			this.setState(state);

		});

  }

	handleSave(event){
		var endpoint = '/gym/sets/';
		var redirect = '/gym/workouts/' + this.state.data.workout;
		postData(endpoint, this.state.data).then(json => {
			this.props.history.push(redirect);
		});
	}

	handleChange(event){

		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;

		var data = this.state.data;
		data[name] = value;

		var state = {data: data};
		this.setState(state);

	}

  componentWillMount(){
    this.getOptions()
  }

	renderForm(){

		return(
			<form>
        <FormInput
          label="Workout order" id="workout_order" type="number"
          onChange={(e) => this.handleChange(e)} />

        <FormSelect label="Workout" id="workout" type="select"
          options={this.state.workoutOptions}
          onChange={(e) => this.handleChange(e)} />

        <FormSelect label="Excercise" id="excercise" type="select"
          options={this.state.excerciseOptions}
          onChange={(e) => this.handleChange(e)} />

        <FormInput label="Repetitions" id="reps" type="number"
          onChange={(e) => this.handleChange(e)} />

        <FormInput label="Weight" id="weight"
          onChange={(e) => this.handleChange(e)} />

        <FormInput label="Comments" id="comments" type="textarea"
          onChange={(e) => this.handleChange(e)} />

        <Btn bsStyle="success" icon="save" text="Save"
          onClick={(event) => this.handleSave(event)} />

			</form>
		)
	}

	render() {

		return (
				<Row>
					<Col md={12}>
            <PageTitle title="Add Set" />
            <hr/>
						{this.renderForm()}
					</Col>
				</Row>
		)
	}
}

export default GymSetAdd;
