import React from "react";
import "./styles/App.css";
import firebase from "firebase";
import "./configs/Fire";
import Tile from "./components/Tile";
import AppBar from "@material-ui/core/AppBar"
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography, Toolbar, Button, Box, Avatar } from "@material-ui/core";
import { createStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Send, Image, Close } from "@material-ui/icons";

const theme = createStyles({
  palette: {
    type: 'dark',
  },
});

const darkTheme = createTheme(theme);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointer: 0,
      text: "",
      array: [],
      user: firebase.auth().currentUser,
      image: null,
      isPostModalOpen: false
    };
    this.exportData = this.exportData.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.stringToColour = this.stringToColour.bind(this);
  }

  rand() {
    var d = new Date();
    var n = d.getTime();
    return n;
  }

  exportData() {
    if (this.state.text) {
      var ref = firebase.database().ref("posts");
      let postId = this.rand();
      function loadXHR(url) {

        return new Promise(function (resolve, reject) {
          try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function () { reject("Network error.") };
            xhr.onload = function () {
              if (xhr.status === 200) { resolve(xhr.response) }
              else { reject("Loading error:" + xhr.statusText) }
            };
            xhr.send();
          }
          catch (err) { reject(err.message) }
        });
      }
      loadXHR(this.state.image).then(function (blob) {
        // console.log("blob ", blob);
        var storageRef = firebase.storage().ref();
        storageRef.child(`posts/${postId}`).put(blob).then((snapshot) => {
          // console.log('Uploaded an image blob!');
        }).catch((err) => {
          alert('Error in uploading image: ', err);
        });
      });
      ref.child(postId).set({
        id: postId,
        message: this.state.text,
        type: "tile",
        buttonType: "delete",
        user: firebase.auth().currentUser.email,
        viewComment: false,
        hasImg: Boolean(this.state.image),
        comments: [{ message: "", user: "" }],
      });
    }
    this.setState({ text: "", image: null, isPostModalOpen: false });
  }

  componentDidMount() {
    firebase
      .database()
      .ref("posts")
      .on("value", (data) =>
        this.setState({ array: Object.values(data.val()).reverse() })
      );
  }

  deleteTile() {
    var database = firebase.database();
    var refToRemove = database.ref("posts/" + this.state.pointer);
    refToRemove.remove();
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  // uploadImage() {
  //   function loadXHR(url) {

  //     return new Promise(function (resolve, reject) {
  //       try {
  //         var xhr = new XMLHttpRequest();
  //         xhr.open("GET", url);
  //         xhr.responseType = "blob";
  //         xhr.onerror = function () { reject("Network error.") };
  //         xhr.onload = function () {
  //           if (xhr.status === 200) { resolve(xhr.response) }
  //           else { reject("Loading error:" + xhr.statusText) }
  //         };
  //         xhr.send();
  //       }
  //       catch (err) { reject(err.message) }
  //     });
  //   }
  //   loadXHR(this.state.image).then(function (blob) {
  //     console.log("blob ", blob);
  //     var storageRef = firebase.storage().ref();
  //     storageRef.child('test.png').put(blob).then((snapshot) => {
  //       console.log('Uploaded a blob or file!');
  //     });
  //   });
  // }

  stringToColour() {
    let str = firebase.auth().currentUser.email;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={darkTheme}>

          {/* Referred from https://stackoverflow.com/questions/50012686/both-right-and-left-aligned-icons-in-appbar-with-material-ui-next */}
          <AppBar style={{
            "backgroundColor": "#202225"
          }}>
            <Toolbar>
              <Box display='flex' flexGrow={1}>
                <Typography variant="h5" style={{
                  "padding": "20px"
                }}>AppName</Typography>
              </Box>

              {firebase.auth().currentUser && <Avatar style={{
                "backgroundColor": `${this.stringToColour()}`
              }}>{firebase.auth().currentUser.email.substr(0, 2)}</Avatar>}

              <div style={{
                "paddingLeft": "20px"
              }}>
                <IconButton
                  onClick={() => { this.setState({ isPostModalOpen: true }) }}
                >
                  <Send />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>

          {/* <AppBar style={{
            "backgroundColor": "#202225"
          }}>
            <Grid container spacing={10}>
              <Grid item xs={10}>
                <Typography variant="h5" style={{
                  "padding": "20px"
                }}>AppName</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  justify="flex-end"
                  // style={{
                  //   "left": "30px",
                  //   "top": "10px"
                  // }}
                  onClick={() => { this.setState({ isPostModalOpen: true }) }}
                >
                  <Send />
                </IconButton>
              </Grid>
            </Grid>
          </AppBar> */}


          {/* <input
            type="text"
            value={this.state.text}
            placeholder="Enter your text here..."
            onChange={(event) => this.setState({ text: event.target.value })}
          ></input>
          <br />
          <label for="img">Select image </label>
          <input type="file" id="img" name="img"
            onChange={this.onImageChange}
          ></input>
          <br />
          <button onClick={this.exportData}>Post</button>
          <button onClick={() => firebase.auth().signOut()}>Log Out</button>
          <br />
          <br /> */}
          <div style={{
            "height": "100px"
          }}></div>
          {/* <button onClick={() => this.uploadImage()}>Upload image</button> */}
          <div id="posts">
            {this.state.array.map((item) => (
              <Tile
                id={item.id}
                updateComment={() => {
                  const ref = firebase.database().ref("posts");
                  ref.child(item.id).update({ viewComment: !item.viewComment });
                }}
                rand={this.rand}
                comments={item.comments}
                hasImg={item.hasImg ?? false}
                viewComment={item.viewComment}
                type={item.type}
                message={item.message}
                buttonType={item.buttonType}
                deleteTile={this.deleteTile}
                setState={() => this.setState({ pointer: item.id })}
                user={item.user}
                currentUser={this.state.user}
              />
            ))}
          </div>



          <Dialog open={this.state.isPostModalOpen} fullWidth maxWidth="md" onClose={() => { this.setState({ isPostModalOpen: false }) }}>

            <DialogTitle>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1} >
                  <Typography variant="h5">Create a post</Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => { this.setState({ isPostModalOpen: false }) }}>
                    <Close />
                  </IconButton>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent>
              <TextField style={{
                "width": "100%"
              }}
                value={this.state.text}
                placeholder="Enter your text here..."
                onChange={(event) => this.setState({ text: event.target.value })}
                multiline rows={3} variant="outlined"></TextField>
            </DialogContent>
            <DialogActions>
              <IconButton component="label">
                <input type="file" id="img" name="img" hidden={true}
                  onChange={this.onImageChange}
                ></input>
                <Image />
              </IconButton>
              <IconButton onClick={this.exportData}>
                <Send></Send>
              </IconButton>

            </DialogActions>
          </Dialog>



        </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
