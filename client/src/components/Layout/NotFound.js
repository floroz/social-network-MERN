import React from 'react';
import PropTypes from 'prop-types';

const NotFound = props => {
	return (
		<>
			<h1 className="x-large text-primary">
				<i className="fas fa-exclamation-triangle" /> Page Not Found
			</h1>
			<p className="large">Sorry, this page does not exist</p>
		</>
	);
};

NotFound.propTypes = {};

export default NotFound;
