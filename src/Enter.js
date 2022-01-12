import React from "react";
import firebase from "firebase";
import "./configs/Fire";
import { createStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import LoginTile from "./components/LoginTile";
import "./styles/App.css";


const theme = createStyles({
  palette: {
    type: 'dark',
  },
});

const darkTheme = createTheme(theme);

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
      <MuiThemeProvider theme={darkTheme}>
        <div id="loginWrapper">
          <LoginTile
            updateEmail={(event) => this.setState({ email: event.target.value })}
            updatePassword={(event) =>
              this.setState({ password: event.target.value })
            }
            message={this.state.message}
            signIn={this.signIn}
            signUp={this.signUp}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
