import React, { Component } from 'react';
import {Row, Col, Button, ButtonToolbar} from 'react-bootstrap';
import ApiTable from './ApiTable';
import FormWorkout from './Forms';
import {getData} from './Api';
import FontAwesome from  'react-fontawesome';

class GenericList extends React.Component {
	
	
	titleFromUrl(){
		var url = this.props.location.pathname;
		//Remove first slash
		url[0] === '/' ? url = url.substring(1) : url = url;
		//Remove trailing slash
		var len = url.length;
		url[len] === '/' ? url.substring(0,len-1) : url = url;
		//Replace middle slashes
		var words = url.split('/');
		for(var i=0; i < words.length ; i++){
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
		}
		var header = words.join(' > ');
		return header;
	}
	
	render() {		
		return (			
		  <div>
			<Row>
				<Col md={12}>
					<h1>{this.titleFromUrl()}</h1>
					<legend></legend>
					<ButtonToolbar>
						<Button bsStyle="success" onClick={() => this.props.history.push(this.props.location.pathname +'/add')}>
							<FontAwesome name="plus"/>
						</Button>
					</ButtonToolbar>					
					<p></p>
					<ApiTable endpoint={this.props.location.pathname}/>
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GenericList;