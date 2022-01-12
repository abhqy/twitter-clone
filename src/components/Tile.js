import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { Delete, InsertComment, Send } from "@material-ui/icons/"
import { red } from "@material-ui/core/colors";
import { Box, Button, CircularProgress, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  iconButton: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function Tile(props) {
  const [comment, setComment] = useState("");
  const array = Object.values(props.comments);
  const [pointer, setPointer] = useState(0);
  const [postUrl, setPostUrl] = useState(null);

  const classes = useStyles();

  function addComment() {
    var ref = firebase.database().ref("posts/" + props.id + "/comments");
    var randomID = props.rand();
    ref.child(randomID).set({
      user: firebase.auth().currentUser.email,
      message: comment,
      id: randomID,
      postUrl: null
    });
    setComment("");
  }

  function mouseDownFunction(pointerID) {
    setPointer(pointerID);
  }

  function mouseUpFunction() {
    var refToRemove = firebase
      .database()
      .ref("posts/" + props.id + "/comments/" + pointer);
    refToRemove.remove();
  }

  function removeComment() {
    var refToRemove = firebase
      .database()
      .ref("posts/" + props.id + "/commments" + pointer);
    refToRemove.remove();
  }

  // Code used from https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  var stringToColour = function (str) {
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
  //

  useEffect(() => {
    if (props.hasImg) {
      // console.log("There's an image for post w/ post desc ", props.message);
      async function getImage() {
        var storageRef = firebase.storage().ref();
        // console.log(storageRef);
        storageRef.child(`posts/${props.id}`).getDownloadURL()
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // Or inserted into an <img> element
            setPostUrl(url);
            // console.log(url);
          })
          .catch((error) => {
            setPostUrl(null);
            setTimeout(() => getImage(), 1000);
          });
      }
      getImage();
    }
  }, [props.hasImg, props.message, props.id])

  return (
    <Paper id={props.type} style={{
      "wordWrap": 'break-word'
    }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {props.user && <Avatar style={{
            "backgroundColor": `${stringToColour(props.user)}`
          }}>{props.user.substr(0, 2)}</Avatar>}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="subtitle1"><b>{props.user}</b></Typography>
          {props.message}

          {(props.hasImg) && ((postUrl) ?
            <div>
              <div
                style={{
                  "height": "15px"
                }}
              />
              <img alt="img" width="300" src={postUrl} />
            </div>
            : <div style={{
              "width": "120px",
              "padding": "50px",
              "margin": "auto"
            }}><CircularProgress /></div>)}
          <br />
          {firebase.auth().currentUser.email === props.user ? (
            // <button
            //   id={props.buttonType}
            //   onMouseUp={props.deleteTile}
            //   onMouseDown={props.setState}
            // >
            //   DELETE
            // </button>
            ////
            <Grid container spacing={2} style={{
              "width": "100%"
            }}>
              <Grid item xs={4} >
                {/* Referred from https://stackoverflow.com/questions/58034255/iconbutton-with-label */}
                <div style={{
                  "position": "relative",
                  "left": "-15px"
                }}>
                  <IconButton classes={{ label: classes.iconButton }}
                    onClick={props.updateComment}>
                    <InsertComment />
                  </IconButton>
                  <span>{array.length - 1}</span>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div></div>
              </Grid>

              <Grid item xs={4} style={{
                "float": "right"
              }}>
                <IconButton
                  style={{
                    "float": "right"
                  }}
                  // style={{
                  //   "left": "160px"
                  // }}
                  // id={props.buttonType}
                  onMouseUp={props.deleteTile}
                  onMouseDown={props.setState}>
                  <Delete color="error" />
                </IconButton>
              </Grid>

            </Grid>
          ) : (
            // Referred from https://stackoverflow.com/questions/58034255/iconbutton-with-label
            <div style={{
              "position": "relative",
              "left": "-15px"
            }}>
              <IconButton classes={{ label: classes.iconButton }}
                onClick={props.updateComment}>
                <InsertComment />
              </IconButton>
              <span>{array.length - 1}</span>
            </div>
          )}
          {props.viewComment ? (
            array.map((obj) => (
              <Comment
                id={obj.id}
                mouseDown={mouseDownFunction}
                mouseUp={mouseUpFunction}
                removeComment={removeComment}
                message={obj.message}
                user={obj.user}
                author={props.user}
              ></Comment>
            ))
          ) : (
            <div />
          )}
          {props.viewComment ? (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <div className="commentTextField">
                    <TextField
                      id="commentTextFieldBox"
                      variant="outlined"
                      multiline
                      maxRows={4}
                      placeholder="Post a comment!"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <IconButton onClick={addComment}>
                    <Send></Send>
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
