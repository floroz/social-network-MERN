import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions//post';
import Spinner from '../Layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the Community
			</p>
			<PostForm />
			<div className="posts">
				{posts && posts.length > 0 ? (
					posts.map(post => <PostItem key={post._id} post={post} />)
				) : (
					<p>There are no posts...</p>
				)}
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);
