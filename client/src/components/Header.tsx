import { Component } from "react";
import { connect } from "react-redux";

class Header extends Component<{ auth: any }> {
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
          <a href="/" className="left brand-logo">
            Emailr
          </a>
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
