import React, { useEffect, useState } from "react";
import snoowrap from "snoowrap";
import Comments from "./Comments";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const r = new snoowrap({
  userAgent: process.env.REACT_APP_REDDIT_USER_AGENT,
  accessToken: process.env.REACT_APP_REDDIT_ANONYMOUS_TOKEN,
});

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 250,
  },
});

function View(props) {
  const classes = useStyles();
  const id = props.match.params.id;
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await r
        .getSubmission(id)
        .fetch()
        .then((data) => {
          setTitle(data.title);
          setThumbnail(data.thumbnail);
          setComments(data.comments);
        });
    })();
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={thumbnail} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </Card>
      <div className="commments">
        <h2>Comments</h2>
        <Comments comments={comments} />
      </div>
    </>
  );
}

export default View;
