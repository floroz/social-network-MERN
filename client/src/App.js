import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Alert from './components/Layout/Alert';

const App = () => (
	<Router>
		<>
			<Navbar />
			<Route exact path="/" component={Landing} />
			<section className="container">
				<Alert />
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</section>
		</>
	</Router>
);

export default App;
