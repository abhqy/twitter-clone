import React, { useState } from "react";
import Comment from "./Comment";
import firebase from "firebase";

export default function Tile(props) {
  const [comment, setComment] = useState("");
  const array = Object.values(props.comments);
  const [pointer, setPointer] = useState(0);

  function addComment() {
    var ref = firebase.database().ref("posts/" + props.id + "/comments");
    var randomID = props.rand();
    ref.child(randomID).set({
      user: firebase.auth().currentUser.email,
      message: comment,
      id: randomID,
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

  return (
    <div id={props.type}>
      <p>
        <b>{props.user}</b>
      </p>
      {props.message}
      <br />
      {firebase.auth().currentUser.email === props.user ? (
        <button
          id={props.buttonType}
          onMouseUp={props.deleteTile}
          onMouseDown={props.setState}
        >
          DELETE
        </button>
      ) : (
        <div></div>
      )}
      <hr />
      <button onClick={props.updateComment}>View Comments</button>
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
          <input
            type="text"
            placeholder="Post a comment!"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button onClick={addComment}>Post</button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
