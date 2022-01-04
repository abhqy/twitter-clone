import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import firebase from "firebase";

export default function Tile(props) {
  const [comment, setComment] = useState("");
  const array = Object.values(props.comments);
  const [pointer, setPointer] = useState(0);
  const [postUrl, setPostUrl] = useState(null);

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

  useEffect(() => {
    if (props.hasImg) {
      console.log("There's an image for post w/ post desc ", props.message);
      async function getImage() {
        var storageRef = firebase.storage().ref();
        console.log(storageRef);
        storageRef.child(`posts/${props.id}`).getDownloadURL()
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // Or inserted into an <img> element
            setPostUrl(url);
            console.log(url);
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
    <div id={props.type}>
      <p>
        <b>{props.user}</b>
      </p>
      {props.message}
      <br />
      {(props.hasImg) && ((postUrl) ? <img alt="img" width="300" src={postUrl} /> : <div>Loading...</div>)}
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
