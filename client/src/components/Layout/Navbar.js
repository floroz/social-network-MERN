import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<NavLink to="/profiles">Developers</NavLink>
			</li>
			<li>
				<NavLink to="/posts">Posts</NavLink>
			</li>
			<li>
				<NavLink to="/dashboard">
					<i className="fas fa-user" />{' '}
					<span className="hide-sm">Dashboard</span>
				</NavLink>
			</li>
			<li>
				<NavLink to="/logout" onClick={logout}>
					<i className="fas fa-sign-out-alt" />{' '}
					<span className="hide-sm">Logout</span>
				</NavLink>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<NavLink to="/profiles">Developers</NavLink>
			</li>
			<li>
				<NavLink to="/register">Register</NavLink>
			</li>
			<li>
				<NavLink to="/login">Login</NavLink>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<NavLink to="/">
					<i className="fas fa-code" /> DevConnector
				</NavLink>
			</h1>
			{!loading && isAuthenticated ? authLinks : guestLinks}
		</nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = {
	logout
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
