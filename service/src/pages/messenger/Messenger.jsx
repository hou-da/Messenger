import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Messages";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { SentimentSatisfiedSharp, SendSharp, PhoneTwoTone, VideocamTwoTone, PersonAddTwoTone, Filter,AttachFile, Cancel } from "@material-ui/icons";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [fichier, setFichier] = useState(null);
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        img: data.img,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8800/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8800/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      message.img = fileName;
      console.log(message);
     
    
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
  
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      await axios.post("http://127.0.0.1:8800/api/upload", data);
      window.URL.createObjectURL(data) 
       
      } catch (err) {}
  }
  if (file) {
    const data = new FormData();
    const fichierName = Date.now() + fichier.name;
    data.append("name", fichierName);
    data.append("file", fichier);
    message.fichier = fichierName;
    console.log(message);
   
  
  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );

  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: newMessage,
  });
  try {
    await axios.post("http://127.0.0.1:8800/api/upload", data);
    window.URL.createObjectURL(data) 
     
    } catch (err) {}
}

    try {
      const res = await axios.post("http://127.0.0.1:8800/api/messages", message);
      //window.location.reload();
      setMessages([...messages, res.data]);
      setNewMessage("");
      setFile("")
      
    } catch (err) {
      console.log(err);
    }
  };
  
 


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
             {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} 
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
          
            {currentChat ? (
             
              <>
              
              <div className="chatInfo">
              
                 <span> {currentChat.members.find(
                        (member) => member !== user.firstName
                      )} </span> 
               
                <div className="chatIcons">
                  <PhoneTwoTone />
                  <VideocamTwoTone />
                  <PersonAddTwoTone />
                </div>
              </div>
             
                <div className="chatBoxTop" >
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                {file && (
                <div className="chatImgContainer">
                  <img className="chatMessageInput" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="chatCancelImg" onClick={() => setFile(null)} />
                    </div>
                   )}
                <div className="chatBoxBottom" >
                 <div className="emoji">
                    <SentimentSatisfiedSharp onClick={handleEmojiPickerhideShow} />
                      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                  </div>
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    
                  ></textarea>
                  
                  <hr className="chatHr" />
                  <label htmlFor="file" className="chatOption">
                    <Filter  className="chatIcon" />
                      <input
                      
                       style={{ display: "none" }}
                       type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg,.mp4"
                       onChange={(e) => setFile(e.target.files[0])}
                       files={newMessage}
                       />
                       
                      </label>
                      
                      <label  className="chatOption">
                    <AttachFile  className="chatIcon" />
                      <input
                       style={{ display: "none" }}
                       type="fichier"
                        id="fichier"
                        accept=".pdf,.txt,.dox"
                        onChange={(e) => setFichier(e.target.files[0])} 
                        files={newMessage}            
                       />
                     </label>
                  
                  <button className="chatIcon" onClick={ handleSubmit}><SendSharp />
                  
                   
                  </button>
                 
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  </>
);
}
