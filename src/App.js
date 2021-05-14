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
    };
    this.exportData = this.exportData.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
  }

  rand() {
    var d = new Date();
    var n = d.getTime();
    return n;
  }

  exportData() {
    var ref = firebase.database().ref("posts");
    ref.child(this.rand()).set({
      id: this.rand(),
      message: this.state.text,
      type: "tile",
      buttonType: "delete",
      user: firebase.auth().currentUser.email,
      viewComment: false,
      comments: [{ message: "", user: "" }],
    });
    this.setState({ text: "" });
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

  render() {
    return (
      <div>
        <button onClick={() => alert(firebase.auth().currentUser.email)}>Log</button>
        {this.state.user ? <p>Hello, {firebase.auth().currentUser.email}!</p> : <div />}
        <input
          type="text"
          value={this.state.text}
          placeholder="Enter your text here..."
          onChange={(event) => this.setState({ text: event.target.value })}
        ></input>
        <button onClick={this.exportData}>Post</button>
        <button onClick={() => firebase.auth().signOut()}>Log Out</button>
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
