import React from 'react';
import '../../Sass/Home.scss';
import  Comments from '../Comments/index';
import  Posts from '../Events/Posts';

function Blog() {

    return (
        <div className="Blog-container">
            <Comments/>
            <Blog/>


        </div>
    );
}

export default Blog;
