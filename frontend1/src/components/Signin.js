import React, { useState, useContext } from "react";
// import { MovieContext } from "../MovieContext";
import { AuthContext } from "../AuthContext";
import { Link, Redirect } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../styles/Signin.css";
import axios from "axios";
import urls from "../apiEndPoints";

const Nav = () => {
  return (
    <nav>
      <div className="logo">
        {/* <BsFillCameraVideoFill />{" "} */}
        <Link to="/" className="name">
          Filba
        </Link>
      </div>
      <div className="signBtn">
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </nav>
  );
};

function Signin() {
  const [count, setCount] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember] = useState(true);
  const {isAuthenticated, setAuth} = useContext(AuthContext);

  
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => setPassword(e.target.value);

  // const handleRemember = (e) => setRememeber(e.target.checked);

  const submit = () => {
    const body = {
      email,
      password,
      remember
    };
    console.log(body);

    // Make api calls
    axios.post(urls.login, body)
      .then(res => {
        const data = res.data;
<<<<<<< HEAD
        if(data.status === "success") {
          // Store token in local storage
          localStorage.setItem("token", data.token);
          // console.log(localStorage.getItem("token"));
          setAuth(n => {
            return {
              ...n,
              token: data.token
            }
          })
          console.log(isAuthenticated);
        } else {
        // update UI telling user that login failed.
        console.log("Resquest went through but returned: ", res);
        // console.log(data.token);
        localStorage.setItem("token", data.token);
        }
=======
        console.log(data);
        localStorage.setItem("token", data.token);
        updateState(n => {
          return {
            ...n,
            logged_in: true
          };
        });
        console.log(state);
>>>>>>> c6fb155287c03fa2a9bf8bf1ba54c9263150f328
      })
      .catch(err => {
        // update UI telling user that login failed.
        console.log("Request didn't go through and return an error: ", err);
      });
  };

  return (
    <div className="sign-body">
      {isAuthenticated.token ? <Redirect to="/" /> : null}
      <Nav />
      <div className="main">
        {count === 1 ? (
          <>
            <div className="center">
              <p>Share that wonderful experience</p>
              <p>Anywhere & Anytime</p>
              <p className="red">Take the thrill with you.</p>
            </div>
            <div className="signin-form">
              <input
                type="email"
                name="email"
                id="emailLogin"
                placeholder="Email..."
                value={email}
                onChange={updateEmail}
              />
              <button 
                className="sign-sub-btn"
                onClick={() => setCount(count + 1)}
              >
                <FaArrowRight size={24} color="var(--font-color)" />
              </button>
            </div>
          </>
        ) : null}

        {/* For the next */}
        {count === 2 ? (
          <>
            <div className="center">
              <p>Recommend a great show</p>
              <p>for your friends.</p>
              <p className="red">Let's see what your friends pick for you.</p>
            </div>
            <div className="signin-form">
              <input
                type="password"
                style={{ fontSize: "18.5px" }}
                name="password"
                id="passwordLogin"
                placeholder="Password..."
                minLength={6}
                maxLength={16}
                value={password}
                onChange={updatePassword}
              />
              
              <button
                className="sign-sub-btn"
                style={{ fontSize: "22px", color: "var(--font-color)"}}
                onClick={submit}
              >
                Login
              </button>
            </div>
            {/* <div className="remember">
            <p>Remember Me</p>
            <input type="checkbox" onChange={handleRemember}/>
            <span className="checkbox-custom"></span>
            </div> */}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Signin;
