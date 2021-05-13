import React from "react";
import firebase from "firebase";
import "./configs/Fire";
import LoginTile from "./components/LoginTile";

export default class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
    };
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => this.setState({ message: error.message }));
  }

  signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => this.setState({ message: error.message }));
  }

  render() {
    return (
      <LoginTile
        updateEmail={(event) => this.setState({ email: event.target.value })}
        updatePassword={(event) =>
          this.setState({ password: event.target.value })
        }
        signIn={this.signIn}
        signUp={this.signUp}
      />
    );
  }
}
