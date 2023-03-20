import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom'

import TopNav from './TopNav';

import Login from '../pages/auth/login';
import Register from '../pages/auth/Register';

import Index from '../pages/Index';

function App() {
	return (
		<Router>
			<TopNav />
			<br/>
			
			<Route path="/register" exact render={(props) => (<Register />)} />
			<Route path="/login" exact render={(props) => (<Login />)} />
			<Route path="/" exact render={(props) => (<Index />)} />
		</Router>
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
