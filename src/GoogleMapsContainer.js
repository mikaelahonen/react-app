import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import {getLocation} from './GeoLocation';

class Mymarker extends Component{
	render(){
		return (
			<p>asd</p>	
		);
	}
}

export class MapContainer extends Component {
		
	
	state = {
		lat: null,
		lng: null,
		acc: null
	}
	
	componentWillMount(){
		getLocation()
		.then((pos) => {
			this.setState({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
				acc: pos.coords.accuracy
			});
		});
	}
	
	render() {
		
		return (
				
			<div className="maps-container">
			<Mymarker/>
					<Map 
						className= 'maps'
						google={this.props.google} 
						center={{
							lat: this.state.lat,
							lng: this.state.lng
						}}
						initialCenter={{
							lat: 0,
							lng: 0
						}}
						zoom={14}>						
						
						<Marker
							title = {'You are here'}
							name= {'Current location'}
							position={{
								lat: this.state.lat,
								lng: this.state.lng
							}}
						/>
						
					</Map>
						
	
			</div>

		);
	}
	
}



export default GoogleApiWrapper({
  apiKey: ('AIzaSyBT0n-dNVqFVv8PhNAAkBxGYLCP4n1QXZU')
})(MapContainer)