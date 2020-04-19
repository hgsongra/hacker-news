import React, { useState, useEffect } from "react";
import fetchPosts from "../service/PostService";
import Post from "./Post";
import InProgress from "./InProgress";
import "./../css/post.css";
import ls from "local-storage";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [tag, setTag] = useState('front_page');
  const [apiCall, setApiCall] = useState(false);
  const myUpvotes = ls.get("localUpvotes") || {}
  const myHiddenPosts = ls.get('hiddenPosts') || {};

  useEffect(() => {
    console.log('useEffect')
    setApiCall(true)
    fetchPosts(tag, page).then((data) => {
      if ((page * 20) > data.nbHits) {
        setNextPage(false)
      }
      setPosts(posts.concat(data.hits));
      setApiCall(false)
    }).catch(() => {
      console.log('API call failed');
      setApiCall(false)
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

  const upDownVote = (id) => {
    let upDown = 0
    if (myUpvotes[id]) {
      delete myUpvotes[id]
      upDown = -1;
    } else {
      myUpvotes[id] = true
      upDown = 1;
    }
    ls.set('localUpvotes', myUpvotes);
    const dupPosts = [...posts];
    const postIndex = dupPosts.findIndex((post) => post.objectID == id);
    dupPosts[postIndex].points += upDown;
    setPosts(dupPosts)
  }

  const hidePost = (id) => {
    myHiddenPosts[id] = true
    ls.set('hiddenPosts', myHiddenPosts);
    const dupPosts = [...posts];
    const postIndex = dupPosts.findIndex((post) => post.objectID == id);
    dupPosts[postIndex].hide = true
    setPosts(dupPosts)
  }

  return (
    <main role="main" className="container">
      <div className="tag_selection" align="right">
        <select className="form-control" onChange={changeTag}>
          <option value="front_page">Front Page</option>
          <option value="story">Story</option>
        </select>
      </div>
      <div className="posts">
        {posts && posts.map((post) => {
          const isHidden = myHiddenPosts[post.objectID] || post.hide
          return !isHidden ? <Post
            key={post.objectID}
            title={post.title}
            author={post.author}
            url={post.url}
            upvotes={post.points}
            comments={post.num_comments}
            created_at={post.created_at}
            upVoteMe={() => upDownVote(post.objectID)}
            isUpvoted={myUpvotes[post.objectID] == true}
            hideMe={() => hidePost(post.objectID)}
          /> : ''
        })}
      </div>
      <div className="load_more">
        {apiCall ? <InProgress /> : ""}
        <p align="center">{nextPage ? <button className="btn btn-primary" onClick={loadMorePosts}>Load more Posts</button> : 'No more posts available'}</p>
      </div>
    </main>
  );
}

export default Posts;