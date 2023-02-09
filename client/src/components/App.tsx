//Rendering layer control (React Router)
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
// const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount(): void {
    //@ts-ignore
    this.props.fetchUser();
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
