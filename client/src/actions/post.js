import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types';
import axios from 'axios';
import { setAlert } from '../actions/alert';

export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

export const addLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes: res.data
			}
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

export const removeLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes: res.data
			}
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

export const deletePost = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/post/${id}`);

		dispatch({
			type: DELETE_POST,
			payload: id
		});

		dispatch(setAlert('Post Removed', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};