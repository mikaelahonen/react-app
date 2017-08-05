import React from 'react';
import ReactDOM from 'react-dom';


import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import {isLoggedIn} from './Api';

import App from './App';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import Gym from './Gym';
import GymWorkouts from './GymWorkouts';

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login}/>
			<Route path='/logout' component={Logout}/>
			<Route path='/' component={() => (
				!!localStorage.token ? (<App />) : (<Redirect to="/login" />)
			)}/>
		</Switch>
	</BrowserRouter>
	), document.getElementById('root')
);
	
registerServiceWorker();
