import "./message.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";


export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
    
        <div className="messageTop">

          <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        
        <div className="messageContent">
          
        <p> {message.text}</p>
        {message.img && <img src={PF+message.img} alt="" />}
        {message.fichier && <img src={PF+message.fichier} alt="" />}
      </div>  
      
      
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
      
      
       
        
      
    
    </div>
  );
}