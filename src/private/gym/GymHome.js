import React, { Component } from 'react';
import { Button, ButtonToolbar, Jumbotron, Row, Col, Well } from 'react-bootstrap';
import {withRouter, Link, Route} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class GymHome extends Component {

	handleClick(e){
		const url = e.currentTarget.getAttribute('data-url');
		console.log(url);
		this.props.history.push(url);
		e.preventDefault();
	}

  render() {
    return (
		<div>
			<Jumbotron>
				<h2>Gym App</h2>
				<p><i>Here you can find gym training utilities.</i></p>
			</Jumbotron>
		</div>
	);
  }
}

export default GymHome;
