import {
	PROFILE_ERROR,
	GET_PROFILE,
	GET_PROFILES,
	UPDATE_PROFILE,
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_REPOS
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

// Get all Profiles
export const getProfiles = () => async dispatch => {
	dispatch({
		type: CLEAR_PROFILE
	});
	try {
		const res = await axios.get('/api/profile/');
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

//Get Profile by ID
export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

//Get GitHub Repos
export const getGithubRepos = githubUserName => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/github/${githubUserName}`);
		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

// Create or update profile
export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/profile', formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put('/api/profile/experience', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Experience Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put('/api/profile/education', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Education Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
	try {
		const response = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: response.data
		});

		dispatch(setAlert('Experience removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete Education
export const deleteEducation = id => async dispatch => {
	try {
		const response = await axios.delete(`/api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: response.data
		});

		dispatch(setAlert('Education removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete Account and profile
export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			const response = await axios.delete(`/api/profile/`);

			dispatch({
				type: CLEAR_PROFILE,
				payload: response.data
			});
			dispatch({
				type: ACCOUNT_DELETED
			});

			dispatch(setAlert('Your Account has been permanently deleted'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};
