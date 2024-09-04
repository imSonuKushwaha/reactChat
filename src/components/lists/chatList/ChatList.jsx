import React, { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import useUserStore from "../../../lib/UserStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/Firebase";
import useChatStore from "../../../lib/chatStore";
import avatar from "../../../img/avatar.png";
import search from "../../../img/search.png";
import minus from "../../../img/minus.png";
import plus from "../../../img/plus.png";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
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
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((item) => item.chatId == chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
    } catch (err) {
      console.log(err);
    }

    await changeChat(chat.chatId, chat.user);
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={search} alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <img
          src={addMode ? minus : plus}
          alt=""
          className="add"
          onClick={() => {
            setAddMode(!addMode);
          }}
        />
      </div>

      {filteredChats?.map((chat) => {
        return (
          <div
            className="item"
            key={chat?.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
          >
            <img
              src={
                chat.user.blocked.includes(currentUser.id)
                  ? avatar
                  : chat?.user?.avatar || avatar
              }
              alt=""
            />
            <div className="texts">
              <span>
                {chat.user.blocked.includes(currentUser.id)
                  ? "User"
                  : chat?.user?.username}
              </span>
              <p>{chat?.lastMessage}</p>
            </div>
          </div>
        );
      })}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
