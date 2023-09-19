import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//import { usehistory } from "react-router";
export default function Register() {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const phone_number = useRef();
    const date_Birth = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();
    const Email =useRef()
    const Phone = useRef()
    //const history =usehistory()

   // const [verify, setVerify] = useState({ Email: false, Phone: false })

   /* const onChangeVerify = e => {
        setVerify(e.target.value)
    }*/
    const [verify, setverify] = useState(" Email")

    const onChangeVerify = (e) => {
        setverify(e.target.value)
    }
            
    const handleClick = async (e) => {
        e.preventDefault();
            if (passwordAgain.current.value !== password.current.value) {
                  passwordAgain.current.setCustomValidity("Passwords don't match!");
            } else {
            const user = {
             firstName: firstName.current.value,
              lastName: lastName.current.value,
              phone_number: phone_number.current.value,
              date_Birth: date_Birth.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            
            try {
                axios.post('http://127.0.0.1:8800/api/auth/register', user
                )
                .then((res) => {
                   console.log(res,"aaaaaaaaaaa");
                         navigate('/login');
                    }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
                } catch (err) {
                    console.log(err);
                }

            }}

  return (
    <div className="login">
            <div className="logiWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">ISend</h3>
                    <span className="loginDesc">
                    Connecte with friends and the world around you on ISend.

                    </span>
                </div>
            <div className="loginRight">
                <form className="registerBox" onSubmit={handleClick}>
                <h3 className="RegisterDesc " >Sign Up</h3>
               
                
                    <input 
                        placeholder= "firstName"
                        required
                        ref={firstName}
                        pattern= "^[A-Za-z0-9]{3,16}$"
                     
                        />

                    <input
                        placeholder= "lastName"
                        required
                        ref={lastName}
                        pattern= "^[A-Za-z0-9]{3,16}$"
                    />
                
                    <input 
                        placeholder= "Birthday"
                        type= "date"
                        ref={date_Birth}
                
                     /> 
                     
                      
                    <input
                        placeholder="phone Number "
                        required
                        ref={phone_number}
                    />
 
                    <input
                        placeholder="Email"
                        required
                        ref={email}
                        type="email"
                    />

                    <input
                        placeholder="Password"
                        required
                        ref={password}
                        type="password"
                        minLength="6"
                    
                    />
                    
                    <input
                        placeholder="Password Again"
                        required
                        ref={passwordAgain}
                        type="password"
                    />
                    
                    <p>Verify your compte with:</p>

                    <div >
                        
                    
                            <input
                                type="radio"
                                name="verify"
                                value="Email"
                               
                                checked={verify==="Email"}
                                onChange={onChangeVerify} 
                                className="radioInput"
                            />
                        <label htmlFor="email">Email</label>
                        
                            <input
                                class
                                type="radio"
                               
                                value="Phone"
                                name="verify"
                                checked={verify === "Phone"}
                                onChange={onChangeVerify} 
                                
                                className="radioInput"
                            />
                        <label htmlFor="phone_number">Phone</label>
                    </div>

                        
                        
                        
                        <button className="registerButton" type="submit" >Sign Up</button>
                        <Link to='/login'>
                        <button className="loginRegisterButton"  >Log into Account</button>
                        </Link>

                        
                        
          </form>
          
        </div>
      </div>
    </div>
  );
}