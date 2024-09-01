import React from "react";
import "./Lists.css";
import UserInfo from "./userinfo/UserInfo";
import ChatList from "./chatList/ChatList";

const Lists = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default Lists;
