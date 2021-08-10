import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import snoowrap from "snoowrap";
import config from "../config.json";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 250,
  },
});

function List(props) {
  const classes = useStyles();
  const r = new snoowrap({
    userAgent: config.REDDIT_USER_AGENT,
    accessToken: config.REDDIT_ANONYMOUS_TOKEN,
  });
  const [list, setList] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const list = [];
        const response = await r.getHot();
        response.map((post, i) => {
          list[i] = post;
        });
        setList(list);
      } catch (error) {
        return <Redirect to="/not-found" />;
      }
    })();
  }, []);

  return (
    <>
      <Paper style={{ padding: "40px 20px" }}>
        {list &&
          Object.values(list).map((data, i) => (
            <Link key={data["id"]} to={`/view/${data["id"]}`}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={data["thumbnail"]}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data["title"]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
      </Paper>
    </>
  );
}

export default List;
