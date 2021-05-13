import React from "react";

export default function LoginTile(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        onChange={props.updateEmail}
      ></input>
      <input
        type="text"
        placeholder="Password"
        onChange={props.updatePassword}
      ></input>
      <button onClick={props.signIn}>Sign In!</button>
      <button onClick={props.signUp}>Sign Up!</button>
      <p>{props.message}</p>
    </div>
  );
}
