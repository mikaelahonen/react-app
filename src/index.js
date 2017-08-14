import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import {isLoggedIn} from './Api';

import App from './App';
import PublicApp from './PublicApp';
import Login from './Login';
import Logout from './Logout';
import PublicAppTwo from './PublicApp2';

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route path='/public' component={PublicApp}/>
			<Route path='/login' component={Login}/>
			<Route path='/logout' component={Logout}/>
			<Route path='/' component={() => (
				isLoggedIn() ? (<App />) : (<Redirect to="/login" />)
			)}/>
		</Switch>
	</BrowserRouter>
	), document.getElementById('root')
);
	
registerServiceWorker();
