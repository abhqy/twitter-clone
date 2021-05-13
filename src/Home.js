import React from "react";
import firebase from "firebase";
import "./configs/Fire";
import App from "./App";
import Enter from "./Enter";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
  }

  authListener() {
    var auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) this.setState({ user });
      else this.setState({ user: null });
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    if (this.state.user) return <App user={this.state.user}></App>;
    else return <Enter />;
  }
}
