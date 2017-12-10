import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {postData, getData, optionsData} from 'functions/Api';
import {objectArrayToDict} from 'functions/Functions';
import {FormInput, FormSelect, Btn, PageTitle, Options} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class GymRoutineAdd extends React.Component {

	state = {
    data:{},
    routineOptions: [],
  }

  getOptions(){

    optionsData('/gym/routines/').then(response => {
			var routineOptions = objectArrayToDict(response.actions.POST.type.choices, "value", "display_name")
      var state = {
        routineOptions: routineOptions,
        ready: true,
      }

			//Set state
			this.setState(state);

		});

  }

	handleSave(event){
		var endpoint = '/gym/routines/';
		var redirect = '/gym/routines';
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
          label="Name" id="name"
          onChange={(e) => this.handleChange(e)} />

        <FormSelect label="Type" id="type" type="select"
          options={this.state.routineOptions}
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
            <PageTitle title="Add Routine" />
            <hr/>
						{this.renderForm()}
					</Col>
				</Row>
		)
	}
}

export default GymRoutineAdd;
