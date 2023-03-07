//Sets up data layer of our application (Redux)
import "materialize-css/dist/css/materialize.min.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createAction, createReducer } from "@reduxjs/toolkit";
import reducers from "./reducers";
import App from "./components/App";
import reduxThunk from "redux-thunk";
import axios from "axios";

//In order to test requests to surveyRoutes
//const survey = {title: 'title X', subject: 'subject X', body: 'Do you have anything to be grateful for?', recipients: 'emailr.servant@gmail.com'}
//@ts-ignore
window.axios = axios;

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

// reduxThunk inspects whatever value we return from the action creator,
// if value is a function then reduxThunk will immediately call that function passing in dispatch(function) as an argument
const store = createStore(reducers, {} as any, applyMiddleware(reduxThunk));

const root = document.getElementById("root");
render(
  //Serves as "glue" between React
  //and the Redux side of our application:
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

console.log("STRIPE KEY IS", process.env.REACT_APP_STRIPE_KEY);
console.log("Environment is", process.env.NODE_ENV);
