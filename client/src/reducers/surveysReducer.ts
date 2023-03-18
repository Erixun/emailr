import { FETCH_SURVEYS } from "../actions/types";

const surveysReducer = function (
  state = [],
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
};

export default surveysReducer;
