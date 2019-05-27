import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Routes from './components/Routing/Routes';
import { loadUser } from './actions/auth';
import setToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
	setToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
				</>
			</Router>
		</Provider>
	);
};
export default App;
