import React, { useEffect, useState } from "react";
import snoowrap from "snoowrap";
import { Route, Switch } from "react-router-dom";
import List from "./components/List";
import View from "./components/View";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function App() {
  const r = new snoowrap({
    userAgent: process.env.REACT_APP_REDDIT_USER_AGENT,
    accessToken: process.env.REACT_APP_REDDIT_ANONYMOUS_TOKEN,
  });
  const [list, setList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const list = [];
      const response = await r.getHot();
      response.map((post, i) => {
        list[i] = post;
      });
      console.log("list", list);
      setList(list);
      setIsLoading(true);
    })();
  }, []);

  if (!isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Switch>
          <Route path="/view/:id" component={View} />
          <Route path="/" exact render={(props) => <List list={list} />} />
        </Switch>
      </Container>
    </React.Fragment>
  );
}

export default App;
