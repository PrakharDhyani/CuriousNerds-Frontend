import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./Chatbox.css";
import api from "../../common/api/Api";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import defaultprofile from "../../img/defaultprofile.jpg"
const Chatbox = ({ chat, currentUser, setSendMessage,  receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const imageRef = useRef();
  
  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await api.get(`/user/${userId}`);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`message/${chat._id}`);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])

  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  
  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

    // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await api.post(`message`,message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}
  
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="followers">
                <div>
                  <img src = {  userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER +   userData.profilePicture: defaultprofile }
                    alt = "Profile"
                    className = "followerImg"
                    style = {{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style = {{ fontSize: "0.9rem" }}>
                    <span style={{fontWeight:"bold"}} >
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{  width: "95%",  border: "0.1px solid #ececec",  marginTop: "20px",}}
              />
            </div>
            {/* chat-body */}
            <div className = "chat-body" >
              {messages.map((message) => (
                <>
                  <div ref = {scroll} className = {  message.senderId === currentUser ? "message own" : "message"}>
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange}/>
              <div className="send-button button" onClick = {handleSend}>Send</div>
              <input  type="file"  name=""  id=""  style={{ display: "none" }}  ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )} 
      </div>
    </>
  );
};

export default Chatbox;
