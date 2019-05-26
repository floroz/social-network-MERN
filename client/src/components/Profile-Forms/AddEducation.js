import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	} = formData;

	const onChangeHandler = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmitHandler = e => {
		e.preventDefault();

		addEducation(formData, history);
	};

	return (
		<>
			<h1 className="large text-primary">Add An Education</h1>
			<p className="lead">
				<i className="fas fa-code-branch" /> Add any School or Bootcamp that you
				have attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={e => onSubmitHandler(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						name="school"
						required
						value={school}
						onChange={e => onChangeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree"
						name="degree"
						required
						value={degree}
						onChange={e => onChangeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field of Study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={e => onChangeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={e => onChangeHandler(e)}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							value={current}
							checked={current}
							onChange={e => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>{' '}
						Currently Studying
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						name="to"
						value={to}
						onChange={e => onChangeHandler(e)}
						disabled={toDateDisabled ? 'disabled' : ''}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						value={description}
						onChange={e => onChangeHandler(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</>
	);
};

AddEducation.propTypes = {
	addExperience: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addEducation }
)(withRouter(AddEducation));
