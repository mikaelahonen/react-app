import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {Btn, PageTitle} from 'components/Components';

class GymSets extends React.Component {

	render() {

		var addLink = "/gym/sets/add"

		return (
		  <div>
			<PageTitle title="Sets" />
			<hr/>
			<Row>
				<Col md={12}>
					<Btn bsStyle="success" icon="plus" text="Add" to={addLink}/>
				</Col>
			</Row>
		  </div>
		);
	}
}




export default GymSets;
