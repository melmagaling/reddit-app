import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import List from "./components/List";
import View from "./components/View";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NotFound from "./components/NotFound";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Switch>
          <Route path="/view/:id" component={View} />
          <Route path="/" component={List} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
    </React.Fragment>
  );
}

export default App;
