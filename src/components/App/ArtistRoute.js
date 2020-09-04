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

  const followerFormatter = (num) => {
    return num < 999
      ? num
      : num < 999999
      ? (num / 1000).toFixed(1) + "k"
      : (num / 1000000).toFixed(1) + "M";
  };

  if (artist === null) {
    return <div>LOADING...</div>;
  }
  if (artist) {
    const followersNum = followerFormatter(artist.followers.total);
    return (
      <div>
        <h1>{artist.name}</h1>
        <h2>{followersNum} followers</h2>
        <h3>Tags</h3>
        {artist.genres.slice(0, 2).map((genre, index) => {
          return <div key={genre + index}>{genre}</div>;
        })}
      </div>
    );
  }
};

export default ArtistRoute;
