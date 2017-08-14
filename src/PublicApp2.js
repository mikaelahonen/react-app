import React, { Component } from 'react';
import { Button, Jumbotron, Row, Col, Well } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

class PublicAppTwo extends Component {
  render() {
    return (
		<div>
			<h1>Public App 2</h1>
			<Jumbotron>
				<h2>Some app</h2>
				<p><i>This app does something as well.</i></p>
			</Jumbotron>

		</div>
	);
  }
}

export default PublicAppTwo;