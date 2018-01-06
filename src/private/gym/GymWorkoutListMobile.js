import React, { Component } from 'react';
import {Panel, Row, Col, Button, ButtonToolbar, FormGroup, ButtonGroup, InputGroup, Table, ProgressBar, Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {getData, patchData, deleteData} from 'functions/Api';
import {distinctValues, utcToDate, groupBy} from 'functions/Functions';
import {Loading, TableFrame, TableRow, Btn, MainTitle, FormInput} from 'components/Components';
import FontAwesome from  'react-fontawesome';
import {Link, withRouter} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import{connect} from 'react-redux'
import * as workoutActions from 'actions/workoutActions';

class GymWorkoutListMobile extends React.Component {

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

  //Mark set as done
	handleAnalytics(excerciseId, event){
			this.props.history.push('/gym/excercises/' + excerciseId + '/analytics');
	}

  //Mark set as done
  handleEdit(setId, event){
    event.preventDefault();
    this.props.history.push('/gym/sets/' + setId + '/edit');
  }

  render(){

    //Initiate row items
    var items = [];

		//Filter
		var filtered = this.props.workout.sets;
		if(this.props.workout.excerciseFilter != undefined){
			filtered = this.props.workout.sets.filter(set => {
				return set.id == this.props.workout.excerciseFilter;
			});
		}

    filtered.map((set, index) => {

      //Filter excercises
      if(!this.props.workout.excerciseFilter || set.excercise == this.props.workout.excerciseFilter){

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
              <MenuItem key={index+'d'} eventKey={index+'d'} onClick={() => this.handleDelete(set.id)}>
                Delete
              </MenuItem>
              <MenuItem key={index+'e'} eventKey={index+'e'} onClick={(event) => this.handleEdit(set.id, event)}>
                Edit
              </MenuItem>
              <MenuItem key={index+'a'} eventKey={index+'a'} onClick={() => this.handleAnalytics(set.excercise)}>
                Analytics
              </MenuItem>
              <MenuItem key={index+'f'} eventKey={index+'f'} onClick={() => this.props.excerciseFilter(set.id)}>
                Filter
              </MenuItem>
            </Dropdown.Menu>
          </Dropdown>

        //Append default values if the row is expanded
        if(this.props.workout.expandedSet == set.id){
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
        var item = <TableRow onClick={() => this.props.setExpandedSet(set.id)}
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
}

// Maps state from store to props
// To fetch data from Redux store
function mapStateToProps(state, ownProps){
  return {
    // You can now say this.props.workout
    workout: state.workout
  }
}

// Maps actions to props
// To send data to Redux store
function mapDispatchToProps(dispatch){
  return {
  // You can now say this.props.setView
    setView: (view) => dispatch(workoutActions.setView(view)),
		setExpandedSet: (setId) => dispatch(workoutActions.setExpandedSet(setId)),
		excerciseFilter: (setId) => dispatch(workoutActions.excerciseFilter(setId)),
  }
};

const GymWorkoutListMobileConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(GymWorkoutListMobile));

export default GymWorkoutListMobileConnected;
