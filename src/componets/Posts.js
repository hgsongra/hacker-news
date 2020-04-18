import React, { useState, useEffect } from "react";
import fetchPosts from "../service/PostService";
import Post from "./Post";

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [tag, setTag] = useState('front_page');

  useEffect(() => {
    fetchPosts(tag, page).then((data) => {
      if ((page * 20) > data.nbHits) {
        setNextPage(false)
      }
      setPosts(posts.concat(data.hits));
    }).catch(() => {
      console.log('API call failed');
    });
  }, [page, tag]);

  const loadMorePosts = () => {
    setPage(page + 1);
  }


  const changeTag = (e) => {
    setTag(e.target.value);
    setPage(1);
    setPosts([]);
    setNextPage(true)
  }

  return (
    <div>
      <div align="right">
        <select onChange={changeTag}>
          <option value="front_page">FRONT PAGE</option>
          <option value="story">Story</option>
        </select>
      </div>
      <table className="table table-striped">
        <tbody>
          {posts && posts.map((post) => {
            return <Post key={post.objectID} title={post.title} author={post.author} url={post.url} upvotes={post.points} comments={post.num_comments} created_at={post.created_at} />
          })}
        </tbody>
      </table>
      <p align="center">{nextPage ? <button className="btn btn-primary" onClick={loadMorePosts}>Load more Posts</button> : 'No more posts available'}</p>
    </div>
  );
}

export default Posts;