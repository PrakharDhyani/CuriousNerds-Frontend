import React, { useRef, useState } from "react";
import Chatbox from "../../components/Chatbox/Chatbox";
import Conversation from "../../components/Converstaion/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import "./Chat.css";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { io } from "socket.io-client";
import api from "../../common/api/Api"
import NavIcons from "../../components/NavIcons/NavIcons";

const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.user.userInfo);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Connect to Socket.io
  useEffect(() => {
      user.following.map(async (followingId) => {
      // console.log(`req going for ${user._id} and ${followingId}`);
      const data = await api.post("chat", { senderId: user._id, receiverId: followingId })
      // console.log(data)
    })

    
    socket.current = io("https://curiousnerd-scoket.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
    setOnlineUsers(users);
    });
     
  }, [user]);

 // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await api.get(`/chat/${user._id}`);
        // console.log(`chat of user arriving ${data}`)
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);
  
  //Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  //Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      // console.log(data)
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => {setCurrentChat(chat); }}>
                <Conversation  data={chat}  currentUser={user._id}  online={checkOnlineStatus(chat)}/>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons/>
        </div>
        <Chatbox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
      </div>
    </div>
  );
};

export default Chat;
