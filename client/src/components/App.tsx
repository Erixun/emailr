//Rendering layer control (React Router)
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

//TODO: convert to functional component
class App extends Component<{ fetchUser: Function; fetchSurveys: Function }> {
  componentDidMount(): void {
    this.props.fetchUser();
    this.props.fetchSurveys();
  }
  // useEffect(() => {})
  render() {
    return (
      //container class improves materialize styling
      <div className="container">
        <BrowserRouter>
          {/* Collection of routes */}
          <div>
            {/* Header always visible, regardless of route */}
            {/* Content customized based on sign-in status */}
            <Header />

            {/* Greedily matching, unless exact */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
