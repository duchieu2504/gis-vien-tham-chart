import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    posts: PropTypes.array
};

function TodoList(props) {
    const { posts } = props
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export default TodoList