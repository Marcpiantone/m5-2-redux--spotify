import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

import ArtistRoute from "./ArtistRoute";

const DEFAULT_ARTIST_ID = "3WrFJ7ztbogyGnTHbHJFl2";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}></Redirect>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
