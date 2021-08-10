import React, { useEffect } from "react";
import parse from "html-react-parser";
import Comments from "./Comments";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

function Comment(props) {
  const { comment } = props;
  const nestedComments = (comment.replies || []).map((comment) => {
    return <Comments key={comment.id} comments={comment.replies} />;
  });
  return (
    <>
      <div>
        <h4>{comment.author.name} </h4>
        {comment && comment.body && parse(comment.body_html)}
        {nestedComments}
      </div>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </>
  );
}

export default Comment;
