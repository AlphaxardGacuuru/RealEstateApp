import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom'

import TopNav from './TopNav';
import Index from '../pages/Index';

function App() {
	return (
		<Router>
			<TopNav />
			<Index />
		</Router>
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
