import React, { useContext } from "react";
import "../styles/AppNavBar.css";
import logo from "../video-camera.svg";
import { MovieContext } from "../MovieContext";
import { FaSearch, FaAngleDown, FaBell } from "react-icons/fa";
import Friend from "./Friend";

// Bring in img for testing purpose
import Joker from "../joker_movie.jpg";


const UserAvatar = (props) => {
  return (
    <div className="user-avatar">
      <img src={Joker} alt="User Avatar" />
      {/* <span className="number-of-users"> {props.numberOfUsers} </span> */}
      <FaAngleDown size={18} color={"grey"} />
    </div>
  );
};

const AppNavBar = () => {
  const [appState, setAppState] = useContext(MovieContext);

  // Helper functions
  function openFindFriends() {
    setAppState(prevState => ({...prevState, friendsDisplay: true }));
  }
  
  function closeFindFriends() {
    setAppState(prevState => ({...prevState, friendsDisplay: false }));
  }

  const friendDisplay1 = {
    "transform": "translateX(-290px)",
  };

  const friendDisplay2 = {
    "transform": "translateX(0px)",
  };

  const logoVisibility1 = {
    "visibility": "hidden",
  };

  const logoVisibility2 = {
    "visibility": "visible",
  };

  return (
    <nav className="navbar">
      <div className="find-friends" style={appState.friendsDisplay ? friendDisplay2 : friendDisplay1 }>
        <div className="find-input">
          <span>
            <FaSearch size={20} color="grey"/>
          </span>
          <input type="text" name="find_friends" id="find_friends" placeholder="find friends" />
          <span className="closeFindFriends" onClick={closeFindFriends}>&times;</span>
        </div>

        <div className="friend-results">
          <Friend avatar={Joker} name="Nonso" status={true} title="The Avengers" />
          <Friend avatar={Joker} name="Jane" status={true} title="The Avengers" />
          <Friend avatar={Joker} name="Anita" status={false} into="Actions, thriller, Horror" />
        </div>
      </div>
      <div className="top-bar">
        {/* The logo */}
        <div className="logo" style={ appState.friendsDisplay ? logoVisibility1 : logoVisibility2 }>
          <img src={logo} id="cam-logo" width={25} height={25} alt="logo" onClick={openFindFriends} />
          <h3>Filba</h3>
        </div>

        {/* The links */}
        <ul className="nav-links">
          <li className="active">Home</li>
          <li>Movies</li>
          <li>Series</li>
          <li>Live</li>
          <li>My List</li>
        </ul>

        {/* The search, notification and user */}
        <div className="snu">
          <button className="search">
            <FaSearch size={27} />
          </button>
          <button className="notification">
            <FaBell size={27} />
            <span id="notification-number">2</span>
          </button>
          <UserAvatar numberOfUsers={2} />
        </div>
      </div>
    </nav>
  );
};

export default AppNavBar;