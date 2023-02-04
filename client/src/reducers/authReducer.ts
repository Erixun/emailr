import { createAction, createReducer } from "@reduxjs/toolkit";

const increment = createAction<number>("increment");

export const authReducer2 = createReducer({ counter: 0 }, (builder) => {
  builder.addCase(increment, (state, action) => {
    // action is inferred correctly here
    state.counter += action.payload;
  });
});

const authReducer = function (state = {}, action: { type: string }) {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
