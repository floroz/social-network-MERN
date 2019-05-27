import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../Posts/PostItem';

const Post = ({ getPost, match, post: { post, loading } }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match.params.id]);

	return (
		<div>
			<h1>Test</h1>
			{loading && post === null ? (
				<Spinner />
			) : (
				<PostItem showActions={false} post={post} />
			)}
		</div>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
