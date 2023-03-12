import axios from "axios";
import { Dispatch } from "redux";
import { FormState } from "../components/surveys/SurveyForm";
import { FETCH_USER } from "./types";
import { History } from "history";

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

/**
 *Handle token received from Stripe on payment through checkout form.
 * @param token Token received from Stripe.
 * @returns An async function for handling POST request and action dispatch.
 */
export const handleToken = (token: string) => async (dispatch: Dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

/**
 * Handles survey submission and redirects to /surveys on success.
 * @param values Form values.
 * @param history History object.
 * @returns An async function for handling POST request and action dispatch.
 */
export const submitSurvey =
  (values: FormState, history: History) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post("/api/surveys", values);
      dispatch({ type: FETCH_USER, payload: res.data });
      history.push("/surveys");
    } catch (error) {
      console.error(error);
    }

    return { type: "submit_survey" };
  };
