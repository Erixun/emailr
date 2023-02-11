import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { FETCH_USER } from "./types";

//TODO: ensure working proxy in dev & prod
// axios.defaults.baseURL = "localhost:5000"?

/**
 * Our first action creator, for fetching user on startup
 * @returns A function.
 */
export const fetchUser = () => async (dispatch: Dispatch) => {
  let res = undefined;
  try {
    res = await axios.get("/api/current_user");
  } catch (err) {
    console.log(err);
  }

  if (res) dispatch({ type: FETCH_USER, payload: res.data });
};
