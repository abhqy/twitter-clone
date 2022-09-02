import { Button, TextField, Grid, Box, Typography } from "@material-ui/core";
import React from "react";
import "../styles/App.css"

export default function LoginTile(props) {
  return (
    <div className="loginCard" style={{
      "display": "inline-block",
      backgroundColor: "#202225",
      "height": "400px",
      "padding": "0px 10px",
      "width": "40%",
      "verticalAlign": "middle"
    }}>
      <div style={{
        // "backgroundColor": "white",
        "height": "100%",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
      }}>
        <div style={{
          // "backgroundColor": "blue"
        }}>

          <Box display='flex' flexGrow={1} style={{
            "justifyContent": "center"
          }}>
            <img src={require('../images/logo.png')} style={{
              "width": "30px",
              "height": "30px",
              "position": "relative",
              "top": "17px",
              "left": "5px"
            }} alt="logo" />
            <Typography variant="h5" id="appBarLogo" style={{
              "color": "white"
            }}>Heyo!</Typography>
          </Box>
          <TextField placeholder="Email"
            variant="outlined"
            onChange={props.updateEmail}></TextField>
          {/* <input
            type="text"
            placeholder="Email"
            onChange={props.updateEmail}
          ></input> */}
          <br />
          <br />
          <TextField placeholder="Password"
            variant="outlined"
            type="password"
            onChange={props.updatePassword}></TextField>
          {/* <input
            type="text"
            placeholder="Password"
            onChange={props.updatePassword}
          ></input> */}
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" onClick={props.signIn}>Sign In</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" color="primary" onClick={props.signUp}>Sign Up</Button>
            </Grid>
          </Grid>
          <br />
          <Typography style={{ "color": "red" }}>{props.message}</Typography>

          {/* <button onClick={props.signIn}>Sign In!</button>
          <button onClick={props.signUp}>Sign Up!</button> */}
        </div>
      </div>
    </div>
  );
}
