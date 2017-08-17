import React, { Component } from 'react';
import {Row, Nav, Col, Button, ButtonToolbar} from 'react-bootstrap';
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
				<Col xs={12}>
					<div id="head-area">
						
								<h1 id="tbl-head">{this.titleFromUrl()}</h1>
						
							
								<Button id="tbl-btn" bsStyle="success" onClick={() => this.props.history.push(this.props.location.pathname +'/add')}>
									<FontAwesome name="plus"/>
								</Button>
							

						</div>

					<legend></legend>
					<ApiTable endpoint={this.props.location.pathname}/>
				</Col>
			</Row>
		  </div>
		);
	}
}



 
export default GenericList;