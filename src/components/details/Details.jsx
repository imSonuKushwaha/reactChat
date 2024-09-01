import React from "react";
import "./Details.css";
import { auth } from "../../lib/Firebase";

function Details() {
  const photoItems = (
    <div className="photoItem">
      <div className="photoDetail">
        <img
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt=""
        />
        <span>photo_2024_2.png</span>
      </div>
      <img src="./download.png" alt="" className="icon" />
    </div>
  );
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h3>Jane Doe</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            {photoItems}
            {photoItems}
            {photoItems}
            {photoItems}
            {photoItems}
            {photoItems}
            {photoItems}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Details;
