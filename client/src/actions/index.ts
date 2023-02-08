import axios from "axios";
import { FETCH_USER } from "./types";

//TODO: ensure working proxy in dev & prod
// axios.defaults.baseURL = "localhost:5000"?

const fetchUser = () => {
  axios.get("/api/current_user");
};
