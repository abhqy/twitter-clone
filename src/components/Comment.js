import React from "react";
import "../styles/Comment.css";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { Card, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

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

export default function Comment(props) {
  if (props.message)
    return (
      <div>
        <Paper id="comment" elevation={1} style={{
          "borderRadius": 30
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
              {(firebase.auth().currentUser.email === props.user) |
                (firebase.auth().currentUser.email === props.author) ? (
                <div>
                  <IconButton
                    id="delete-comment"
                    onMouseDown={() => props.mouseDown(props.id)}
                    onMouseUp={props.mouseUp}>
                    <Delete color="error" />
                  </IconButton>
                </div>
              ) : (
                <div />
              )}
            </Grid>
          </Grid>
        </Paper>
        <br />
      </div>
    );
  else return <div />;
}
