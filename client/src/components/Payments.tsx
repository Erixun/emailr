import { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout, { StripeCheckoutProps } from "react-stripe-checkout";
import * as actions from "../actions";

class Payments extends Component<{ handleToken: Function }> {
  render() {
    // debugger;

    return (
      //TODO: restyling
      <StripeCheckout
        name="Emailr"
        description="$5 for 5 survey credits"
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY || "unavailable"}
      />
    );
  }
}

export default connect(null, actions)(Payments);
