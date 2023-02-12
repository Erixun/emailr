import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component<{ auth: any; user?: any }> {
  renderContent() {
    const auth = this.props.auth;
    return auth ? (
      <li>
        <a href="/api/logout">Logout?</a>
      </li>
    ) : auth === false ? (
      <li>
        <a href="/auth/google">Login With Google</a>
      </li>
    ) : null;
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
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
