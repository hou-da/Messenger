import { useContext, useRef } from "react";
import axios from "axios"
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useParams } from "react-router";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { user,isFetching, dispatch } = useContext(AuthContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch);
    }
  
  console.log("user = ",user)
                
    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">ISend</h3>
                    <span className="loginDesc">
                    Connecte with friends and the world around you on ISend.

                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox"  onSubmit={handleClick} >
                    <h3 className="RegisterDesc " >Login</h3>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={password}
                        />
                         <button className="loginButton" type="submit" >
                Log In
            </button>
                        
            <Link className="loginForgot">Forgot Password?</Link>
            <button className="loginRegisterButton">
            
                "Create a New Account"
              
            </button>
                    </form>
       
            
                </div>
            </div>
        </div>
    )
}