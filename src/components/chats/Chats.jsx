import React, { useEffect, useRef, useState } from "react";
import "./Chats.css";
import EmojiPicker from "emoji-picker-react";

const Chats = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const chat = (
    <>
      <div className="message own">
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            earum saepe amet quas blanditiis! Est, quas. Iure commodi, numquam
            harum laboriosam hic laudantium, voluptatum ut totam fugiat
            provident neque itaque!
          </p>
          <span>1 min ago</span>
        </div>
      </div>

      <div className="message">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            earum saepe amet quas blanditiis! Est, quas. Iure commodi, numquam
            harum laboriosam hic laudantium, voluptatum ut totam fugiat
            provident neque itaque!
          </p>
          <span>1 min ago</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Deo</span>
            <p>Lorem ipsum dolor sit amet, consectetur </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat}
        {chat}
        {chat}
        <div className="message own">
          <div className="texts">
            <img
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              earum saepe amet quas blanditiis! Est, quas. Iure commodi, numquam
              harum laboriosam hic laudantium, voluptatum ut totam fugiat
              provident neque itaque!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => {
              setOpen(!open);
            }}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chats;
