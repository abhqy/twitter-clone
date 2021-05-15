import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import "../App.css";
import "react-image-crop/dist/ReactCrop.css";
import firebase from "firebase";

import Left from "../components/left/Left"
import Middle from "../components/middle/Middle"

import DialogText from "../components/DialogText"
import DialogProfile from "../components/DialogProfile"

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      profile: false,
      url: null,
      changePP: true,
      width: 0,
      scrollHeight: null,
    };

    this.downloadProfilePicture = this.downloadProfilePicture.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.updateScrollHeight = this.updateScrollHeight.bind(this);
    this.updateOpen = this.updateOpen.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.setUrl = this.setUrl.bind(this)
    this.updateChangePP = this.updateChangePP.bind(this);
  }

  downloadProfilePicture() {
    const name = "test";
    firebase
      .storage()
      .ref()
      .child("profilepics")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        // Insert url into an <img> tag to "download"
        this.setState({ url });
      });
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  updateScrollHeight() {
    if (!this.state.open) {
      this.setState({ scrollHeight: Math.floor(window.pageYOffset) });
    }
  }

  updateOpen() {
    this.setState({ open: !this.state.open })
  }

  updateProfile() {
    this.setState({ profile: !this.state.profile })
  }

  setUrl(imgSource) {
    this.setState({ url: imgSource })
  }


  updateChangePP() {
    this.setState({ changePP: !this.state.changePP })
  }

  componentDidMount() {
    this.downloadProfilePicture();
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);

    window.addEventListener("scroll", this.updateScrollHeight);
  }


  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div id="gradient">
            <p>{this.state.open ? "open" : "not open"}</p>
            <p>{this.state.scrollHeight}</p>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#e3e8ec",
            overflowX: "hidden",
          }}
          >
            <Left setOpen={this.updateOpen} setProfile={this.updateProfile} url={this.state.url} />
            <Middle width={this.state.width} downloadProfilePicture={this.downloadProfilePicture} />
            <DialogText open={this.state.open} setOpen={this.updateOpen} />
            <DialogProfile profile={this.state.profile}
              changePP={this.state.changePP}
              setProfile={this.updateProfile}
              setChangePP={this.updateChangePP}
              downloadProfilePicture={this.downloadProfilePicture}
              url={this.state.url}
            />

          </div>
        </ThemeProvider>
      </div >
    );
  }
}
