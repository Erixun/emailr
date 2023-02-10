import { createAction, createReducer } from "@reduxjs/toolkit";
import { FETCH_USER } from "../actions/types";

// const increment = createAction<number>("increment");

// export const authReducer2 = createReducer({ counter: 0 }, (builder) => {
//   builder.addCase(increment, (state, action) => {
//     // action is inferred correctly here
//     state.counter += action.payload;
//   });
// });

const authReducer = function (
  state = null,
  action: { type: string; payload: any }
) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
