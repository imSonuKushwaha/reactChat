import React, { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import useUserStore from "../../../lib/UserStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/Firebase";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.recieverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.id]);

  const items = (
    <div className="item">
      <img src="./avatar.png" alt="" />
      <div className="texts">
        <span>Jane Doe</span>
        <p>Hello</p>
      </div>
    </div>
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => {
            setAddMode(!addMode);
          }}
        />
      </div>

      {chats?.map((chat) => {
        <div className="item" key={chat.chatId}>
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat?.lastMessage}</p>
          </div>
        </div>;
      })}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
