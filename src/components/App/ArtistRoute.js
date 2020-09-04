import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtist,
  receiveArtist,
  receiveArtistError,
} from "../../actions";
import { getArtist, getArtistStatus } from "../../reducers/artists-reducer";

const ArtistRoute = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.token);
  const params = useParams();
  const artistId = params.id;

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      return;
    }
    dispatch(requestArtist());
    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        dispatch(receiveArtist(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveArtistError());
      });
  }, [accessToken]);

  const artist = useSelector(getArtist());
  console.log(artist);

  const status = useSelector(getArtistStatus());
  console.log(status);

  if (artist === null) {
    return <div>LOADING...</div>;
  }
  if (artist) {
    return <div>...</div>;
  }
};

export default ArtistRoute;
