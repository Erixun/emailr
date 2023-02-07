//Sets up data layer of our application (Redux)
import "materialize-css/dist/css/materialize.min.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createAction, createReducer } from "@reduxjs/toolkit";
import reducers from "./reducers";
import App from "./components/App";
interface CounterState {
  value: number;
}

const increment = createAction("counter/increment");
const decrement = createAction("counter/decrement");
const incrementByAmount = createAction<number>("counter/incrementByAmount");

const initialState = { value: 0 } as CounterState;

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++;
    })
    .addCase(decrement, (state, action) => {
      state.value--;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});

configureStore({
  reducer: counterReducer,
  devTools: process.env.NODE_ENV !== "production",
  // preloadedState,
  // enhancers
});

const store = createStore(reducers, {} as any, applyMiddleware());
const root = document.getElementById("root");
render(
  //Serves as "glue" between React
  //and the Redux side of our application:
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
