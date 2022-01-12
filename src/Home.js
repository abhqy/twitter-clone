import React from "react";
import firebase from "firebase";
import "./configs/Fire";
import App from "./App";
import Enter from "./Enter";
import "./styles/App.css"
import { CircularProgress } from "@material-ui/core";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      authComplete: undefined
    };
    this.authListener = this.authListener.bind(this);
  }

  authListener() {
    var auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({ authComplete: true });
      }
      else {
        this.setState({ user: undefined });
        this.setState({ authComplete: false });
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    if (this.state.authComplete !== undefined) {
      if (this.state.user) return <App user={this.state.user}></App>;
      else return <Enter />;
    } else {
      return <div id="loadingIndicator"><CircularProgress /></div>
    }
  }
}
