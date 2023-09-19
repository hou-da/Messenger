import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userId}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = userId
        ? await axios.get("http://127.0.0.1:8800/api/posts/profile/" + userId)
        : await axios.get("http://127.0.0.1:8800/api/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [ user._id]);

 

  return (
    <div className="feed">
      <div className="feedWrapper">
      
        {(!userId|| userId === user._id) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
