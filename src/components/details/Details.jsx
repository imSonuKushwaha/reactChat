import React from "react";
import "./Details.css";
import { auth, db } from "../../lib/Firebase";
import useUserStore from "../../lib/UserStore";
import useChatStore from "../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import avatar from "../../img/avatar.png";
import download from "../../img/download.png";
import arrowUp from "../../img/arrowUp.png";
import arrowDown from "../../img/arrowDown.png";

function Details() {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlocked,
  } = useChatStore();
  const { currentUser } = useUserStore();
  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlocked();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user, "user");

  const photoItems = (
    <div className="photoItem">
      <div className="photoDetail">
        <img
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt=""
        />
        <span>photo_2024_2.png</span>
      </div>
      <img src={download} alt="" className="icon" />
    </div>
  );
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || avatar} alt="" />
        <h3>{user?.username}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setings</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src={arrowDown} alt="" />
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
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "user Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Details;
