import axios from "axios";
import { Dispatch } from "redux";
import { FETCH_USER } from "./types";

//TODO: ensure working proxy in dev & prod
// axios.defaults.baseURL = "localhost:5000"?

/**
 * Our first action creator, for fetching user on startup
 * @returns A function.
 */
const fetchUser = () => {
  return (dispatch: Dispatch) => {
    axios
      .get("/api/current_user")
      .then((res) => dispatch({ type: FETCH_USER, payload: res }));
  };
};
