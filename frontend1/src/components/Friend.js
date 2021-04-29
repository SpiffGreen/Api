import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import axios from "axios";

// smaller Components
const Offline = () => {
  const offlineStyle = {
    "position": "relative",
    "top": "-38%",
    "left": "-18px"
  };

  return (
    <span style={offlineStyle}><IoVideocamOutline /></span>
  );
}

const Live = () => {
  const spanStyle = {
    "background": "red",
    "padding": "0 8px",
    "fontWeight": "bold",
    "position": "relative",
    "bottom": "17px",
    "fontSize": "9.5px",
    "borderRadius": "3px",
  };
  return <span style={spanStyle}>Live</span>
}

function Friend({ avatar, name, status, title, into }) {
  const background = status ? "linear-gradient(180deg, red, purple)" : "linear-gradient(180deg, dodgerblue, rgb(16, 16, 53))"
  const avatarStyle = {
    "background": background,
    "borderRadius": "50%",
    "width": "66px",
    "height": "66px",
    // "display": "flex",
    // "justify-content": "center",
    // "align-items": "center",
    // "flex-direction": "column",
    "textAlign": "center",
    "padding": "1.1px"
  }
  const imageStyle = {
    "borderRadius": "50%",
    "border": "4px solid #16151a",
    // "transform": "translateY(6px)"
  };

  const mainStyle = {
    "display": "flex",
    "margin": "27px 12px"
  };

  const detailsStyles = {
    "margin": "10px",
    "lineHeight": "1"
  };

  const statusStyles = {
    "color": "red",
    "fontSize": "12px"
  };

  const pStyles = {
    "fontSize": "13px",
    "fontWeight": "bold"
  };

  const h3Styles = {
    "margin": "0 0 6px 6px"
  }

  const addBtnStyle = {
    "backgroundColor": "var(--apps-red)",
    "padding": "2px 8px",
    "border": "none",
    "borderRadius": "3px",
    "outline": "none",
    "float": "right"
  };

  const addFriend = async () => {
    const result = await axios.post(encodeURI(`https://movie-stream-api.herokuapp.com/api/add/friend/${name}`), {
      token: localStorage.getItem("token"),
    });
    console.log(result);
  }

  return (
    <div style={mainStyle}>
      <div className="avatar" style={avatarStyle}>
        <img src={avatar} width={63} height={63} style={imageStyle} alt="Friends Avatar" />
        {status ? <Live /> : <Offline /> }
      </div>
      <div className="details" style={detailsStyles}>
        <h3 style={h3Styles}>{ name.split(" ")[0] }</h3>
        <p style={pStyles}>{ status ? "Now Playing" : "Into" } <button className="addFriendBtn" style={addBtnStyle} onClick={addFriend}>Add</button></p>
        <p><span style={statusStyles}>{ status ? title : into }</span></p>
      </div>
    </div>
  );
}

export default Friend;