const initialState = {
  artist: null,
  status: "idle",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST": {
      console.log(action);
      return {
        ...state,
        artist: action.artist,
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}

export const getArtist = () => {
  return (state) => state.artist.artist;
};

export const getArtistStatus = () => {
  return (state) => state.artist.status;
};
