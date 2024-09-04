import React from "react";
import "./UserInfo.css";
import useUserStore from "../../../lib/UserStore";
import avatar from "../../../img/avatar.png";
import more from "../../../img/more.png";
import video from "../../../img/video.png";
import edit from "../../../img/edit.png";

const UserInfo = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || avatar} alt="" />
        <h3>{currentUser?.username}</h3>
      </div>
      <div className="icons">
        <img src={more} alt="" />
        <img src={video} alt="" />
        <img src={edit} alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
