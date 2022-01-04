import React from "react";
import "./styles/App.css";
import firebase from "firebase";
import "./configs/Fire";
import Tile from "./components/Tile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointer: 0,
      text: "",
      array: [],
      user: firebase.auth().currentUser,
      image: null
    };
    this.exportData = this.exportData.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  rand() {
    var d = new Date();
    var n = d.getTime();
    return n;
  }

  exportData() {
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
      console.log("blob ", blob);
      var storageRef = firebase.storage().ref();
      storageRef.child(`posts/${postId}`).put(blob).then((snapshot) => {
        console.log('Uploaded an image blob!');
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
    this.setState({ text: "", image: null });
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

  render() {
    return (
      <div>
        <input
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
        <button onClick={() => console.log(this.state.image)}>Log image</button>
        <br />
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
      </div>
    );
  }
}

export default App;
