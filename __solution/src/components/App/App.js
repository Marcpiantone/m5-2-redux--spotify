import React from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

import ArtistRoute from "../ArtistRoute";
import MaxWidthWrapper from "../MaxWidthWrapper";
import GlobalStyles from "../GlobalStyles";

const DEFAULT_ARTIST_ID = "2CIMQHirSU0MQqyYHq0eOx";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <MaxWidthWrapper>
        <Switch>
          <Route exact path="/artist/:artistId">
            <ArtistRoute />
          </Route>
          <Route exact path="/">
            <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`} />
          </Route>
        </Switch>
      </MaxWidthWrapper>
      <GlobalStyles />
    </Router>
  );
};

export default App;
