import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
			<h1>
				<NavLink to="/">
					<i className="fas fa-code" /> DevConnector
				</NavLink>
			</h1>
			<ul>
				<li>
					<NavLink to="/profile">Developers</NavLink>
				</li>
				<li>
					<NavLink to="/register">Register</NavLink>
				</li>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
