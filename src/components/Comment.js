import React from "react";
import "../styles/Comment.css";
import firebase from "firebase";

export default function Comment(props) {
  if (props.message)
    return (
      <div id="comment">
        <p>
          <b>{props.user}: </b>
          {props.message}
        </p>
        {(firebase.auth().currentUser.email === props.user) |
        (firebase.auth().currentUser.email === props.author) ? (
          <button
            onMouseDown={() => props.mouseDown(props.id)}
            onMouseUp={props.mouseUp}
          >
            DELETE
          </button>
        ) : (
          <div />
        )}
      </div>
    );
  else return <div />;
}
