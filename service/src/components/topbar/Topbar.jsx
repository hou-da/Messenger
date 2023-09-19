import "./topbar.css"
import {SearchTwoTone, Person, GroupTwoTone, NotificationsActiveTwoTone, HomeTwoTone, ChatTwoTone } from "@material-ui/icons" 
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar({socket}){
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  
     return(
        <div className ="topbarContainer">
            <div className="topbarLeft ">
            <Link to="/home" style={{ textDecoration: "none" }}>
                    <span className="logo">Isend</span>
                    </Link>
                <div className="topbarIcons">
                    <div className="topbarLeftIconItem">
                       <Person/>
                       <span className="topbarLeftIconBadge">1</span>
                    </div>
                   
                   </div>
                
            </div>
            <div className="topbarCenter ">
            
                <div className= "searchbar">
                    <SearchTwoTone/>
                    <input placeholder= "Search for friend, groups, post or video" className="searchInput"/>
                </div>
            </div>

            <div className="topbarRight ">
                <div className="topbarIcons">
                    <div className="topbarRightIconItem">
                    <Link to={`/home`}>
                       <HomeTwoTone/>
                       <span className="topbarRightIconBadge">1</span>
                    </Link>
                    </div>
                    
                    <div className="topbarRightIconItem">
                    <Link to={`/messenger`}>
                       <ChatTwoTone/>
                       <span className="topbarRightIconBadge">2</span>
                       </Link>
                    </div>
                    
                    <div className="topbarRightIconItem">
                       <NotificationsActiveTwoTone/>
                       <span className="topbarRightIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user._id}`}>
                    <img 
                             src={user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                            }
                            alt=""
                        className="topbarImg"
                    />
                </Link>
                <Link to='/logout'>
                <span className="logout" >Logout</span>
                </Link>
             </div>

        </div>
     )
 }