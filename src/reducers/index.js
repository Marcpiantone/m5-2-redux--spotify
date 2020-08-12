import { combineReducers } from "redux";

import auth from "./auth-reducer";
import artist from "./artists-reducer";

export default combineReducers({ auth, artist });
