import React from "react";
import { IconButton } from "@material-ui/core/";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      username: "username",
      room: "room",
      url: null,
      pp: props.pp,
      key: props.index,
      author: props.author
    };

    // bind updateWidth if used!
  }

  // updateWidth() {
  //   this.setState({ width: window.innerWidth });
  // }

  componentDidMount() {
    if (this.state.url) {
      this.state.pp();
    }
  }

  render() {
    return (
      <a style={{ textDecoration: "none" }} href={`posts/${this.state.key}`}>
        <div
          id="tile"
          style={{ width: "auto", display: "flex", flexDirection: "row" }}
        >
          <div
            id="vote"
            style={{
              display: "flex",
              flexDirection: "column ",
              marginBottom: "30px",
              position: "relative",
              left: "-14px",
              color: "#3c51bd",
            }}
          >
            <IconButton
              style={{ width: "30px", height: "30px", color: "#3c51bd" }}
            >
              <ExpandLessIcon />
            </IconButton>
            <b>500</b>
            <IconButton
              style={{ width: "30px", height: "30px", color: "#3c51bd" }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <b>{this.state.author}</b>
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "0",
              }}
            >
              {this.state.text}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                position: "relative",
              }}
            >
              <IconButton style={{ color: "#3c51bd" }}>
                <DeleteIcon style={{ fontSize: "25px" }} />
              </IconButton>

              <IconButton onClick={() => alert(this.state.key)} style={{ color: "#3c51bd" }}>
                <ModeCommentOutlinedIcon style={{ fontSize: "25px" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
