import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component<{ auth: any; user?: any }> {
  renderContent() {
    const auth = this.props.auth;
    console.log(auth);
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key={1}>
            <Payments />
          </li>,
          <li key={2} style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key={3}>
            <a href="/api/logout">Logout?</a>
          </li>,
        ];
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
            style={{ paddingLeft: "10px" }}
          >
            Emailr
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }: { auth: any }) {
  console.log(auth);
  return { auth };
}

export default connect(mapStateToProps)(Header);
