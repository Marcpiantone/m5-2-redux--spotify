import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

import ArtistRoute from "./ArtistRoute";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import { useDispatch } from "react-redux";

const DEFAULT_ARTIST_ID = "3WrFJ7ztbogyGnTHbHJFl2";

const App = () => {
  const dispatch = useDispatch();

  const handleNewToken = () => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => dispatch(receiveAccessToken(json.access_token)))
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  };

  useEffect(() => {
    handleNewToken();
  }, []);

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
