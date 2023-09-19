
 import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [user, setUser] = useState({});
  // const [user, setUser] = useState({});
 //const { user} = useContext(AuthContext);
  const firstName = useParams().firstName;
  const lastName = useParams().lastName;
  const userId  = useParams().userId 
  const _id  = useParams()._id

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://127.0.0.1:8800/api/users?userId=${userId}`)
      setUser(res.data)
      console.log("res=   ", res.data)
    };
    fetchUser();
  }, [firstName, user._id, lastName]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop" >
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              
              <img
                className="profileUserImg"
                src={ 
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.firstName+" "+user.lastName}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={_id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

