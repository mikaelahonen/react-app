import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRouter from 'private/Router';
import PublicRouter from 'public/Router';
import LoginCognito from 'LoginCognito';
import LogoutCognito from 'LogoutCognito';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

//Configure Redux storage
const store = configureStore();

//Render the main view
ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path='/login-cognito' component={LoginCognito}/>
				<Route exact path='/logout-cognito' component={LogoutCognito}/>
				<Route path='/public' component={PublicRouter}/>
				<Route path='/' component={PrivateRouter}/>
			</Switch>
		</BrowserRouter>
	</Provider>
	), document.getElementById('root')
);

registerServiceWorker();
