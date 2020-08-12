import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtist,
  receiveArtist,
  receiveArtistError,
} from "../../actions";
import { getArtist } from "../../reducers/artists-reducer";

const ArtistRoute = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.token);
  const params = useParams();
  const artistId = params.id;
  console.log(accessToken);
  console.log(!accessToken);

  useEffect(() => {
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

  return <div>ArtistRoute</div>;
};

export default ArtistRoute;
