import React from "react";
import { format } from 'timeago.js';
import Truncate from "./../helper/Truncate";
import { FaArrowUp, FaArrowDown, FaEyeSlash } from 'react-icons/fa';

const Post = ({ title, author, url, upvotes, comments, created_at, upVoteMe, isUpvoted, hideMe }) => {

  return <div className="row">
    <div className="col-md-1 col-sm-3">{comments}</div>
    <div className="col-md-1 col-sm-3" >
      {upvotes} <a onClick={upVoteMe}>{isUpvoted ? <FaArrowDown /> : <FaArrowUp />}</a>
    </div>
    <div className="col-md-4 col-sm-6">{Truncate(title, 45)}</div>
    <div className="col-md-3 col-sm-6"><a href={url} target="_blank">{Truncate(url, 35)}</a></div>
    <div className="col-md-1 col-sm-2">{author}</div>
    <div className="col-md-2 col-sm-4" align="right">
      {format(created_at)} <br />
      [ <a onClick={hideMe}><FaEyeSlash /></a> ]
    </div>
  </div>
}

export default Post;