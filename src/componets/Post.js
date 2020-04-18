import React, { useState, useEffect } from "react";
import fetchPosts from "../service/PostService";
import { format } from 'timeago.js';


const Post = ({ title, author, url, upvotes, comments, created_at }) => {
  return <tr>
    <td>{comments}</td>
    <td>{upvotes}</td>
    <td>{title}</td>
    <td>{url}</td>
    <td>{author}</td>
    <td>{format(created_at)}</td>

  </tr>
}

export default Post;