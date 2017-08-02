import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import {isLoggedIn} from './Api';

import Login from './Login';
import User from './User';
import Home from './Home';
import Gym from './Gym';
import GymWorkouts from './GymWorkouts';

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login}/>
			<Route path='/' component={() => (
				!isLoggedIn() ? (<Redirect to="/login" />) : (<App />)
			)}/>
		</Switch>
	</BrowserRouter>
	), document.getElementById('root')
);
	
registerServiceWorker();
