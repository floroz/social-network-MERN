import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Alert from './components/Layout/Alert';
import CreateProfile from './components/Profile-Forms/CreateProfile';
import EditProfile from './components/Profile-Forms/EditProfile';
import PrivateRoute from './components/Routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';
import AddExperience from './components/Profile-Forms/AddExperience';
import AddEducation from './components/Profile-Forms/AddEducation';

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
					<Route exact path="/" component={Landing} />
					<section className="container">
						<Alert />
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path="/edit-profile"
								component={EditProfile}
							/>
							<PrivateRoute
								exact
								path="/add-experience"
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path="/add-education"
								component={AddEducation}
							/>
						</Switch>
					</section>
				</>
			</Router>
		</Provider>
	);
};
export default App;
