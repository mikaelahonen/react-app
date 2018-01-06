import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {isLoggedIn} from 'functions/Api';
import PrivateRouter from 'private/Router';
import AppPublic from 'public/App';
import Login from './Login';
import Logout from './Logout';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

const store = configureStore();

ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path='/public' component={AppPublic}/>
				<Route path='/login' component={Login}/>
				<Route path='/logout' component={Logout}/>
				<Route path='/' component={() => (
					isLoggedIn() ? (<PrivateRouter />) : (<Redirect to="/login" />)
				)}/>
			</Switch>
		</BrowserRouter>
	</Provider>
	), document.getElementById('root')
);

registerServiceWorker();
