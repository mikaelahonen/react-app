import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
//React Router
import {Switch, Route} from 'react-router-dom';


class PublicHome extends Component {
  render() {
    return (
			<Grid id="container">
				<Row>
					<Col md={12}>
						<Jumbotron>
							<h1>Public Apps</h1>
							<p>Welcome! Explore publicly available apps from navigation menu.</p>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
	);
  }
}

export default PublicHome;