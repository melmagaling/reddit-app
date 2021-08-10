import React, { useEffect } from "react";
import Comment from "./Comment";
import { Paper } from "@material-ui/core";

function Comments(props) {
  return (
    <>
      <Paper style={{ padding: "40px 20px" }}>
        {props.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Paper>
    </>
  );
}

export default Comments;
