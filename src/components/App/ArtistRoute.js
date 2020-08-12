import React, { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { getAccessToken } from "../../reducers/auth-reducer";

const ArtistRoute = () => {
  const accessTokenState = useSelector((state) => state.auth);
  const accessToken = useSelector((state) => state.auth.token);
  const params = useParams();
  const artistId = params.id;
  console.log(accessToken);
  console.log(!accessToken);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    fetchArtistProfile(accessToken, artistId);
  }, [accessToken]);

  return <div>ArtistRoute</div>;
};

export default ArtistRoute;
