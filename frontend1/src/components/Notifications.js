import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";
// import axios from "axios";
import io from "socket.io-client";
import { NotificationContext } from '../NotificationContext';
import { FaTimes } from "react-icons/fa";
import "../styles/Notification.css";

const Notification = () => {
  const [note, setNote] = useState({});
  const [view, setView] = useState(false);
  const {notify, setNotify} = useContext(NotificationContext);

  const socket = useRef();

  useEffect(() => {
    if(notify.val) {
      console.log(notify);
      socket.current.emit("send_invite",  {
        link: window.location.href,
        name: notify.user,
        movie: notify.movie_name,
        room_id: notify.room_id,
        movie_id: notify.movie_id
      }, () => {
        console.log(`Sent invite for ${notify.movie_name} to ${notify.user}`);
        setNotify(prev => {
          return {...prev, val: false};
        });
      });
    }
    // eslint-disable-next-line
  }, [notify]);

  useEffect( () => {
  socket.current = io.connect(window.location.protocol + "//movie-stream-api.herokuapp.com/");
  // const socket = {on: function(){}, emit: function() {}};
  console.log(socket);
  socket.current.on("connect", (ev) => {
    socket.current.emit("online", { name: "Me" });
  });

  socket.current.on("resp", (resp_data) => {
    // alert("Resp");
    console.log("Resp: ", resp_data);
  });

  socket.current.on("status_change", (data) => {
    console.log("Status Changed: ", data);
  });

  socket.current.emit("online", {
    name: "Spiff Jekey-Green"
  });

  // socket.onAny((ev) => console.log("Events: ", ev));

  socket.current.on("Invited", (data) => {
    // data-> link, name, movie
    console.log("Invited: ", data.data);
    setNotify(data.data);
    setView(true);
  })
  
  }, []);
  return view ? (
    <div className="notif">
      <div className="inner">
        <p><Link to={(new URL(notify.link)).pathname + `?invited=true&movie_id=${notify.movie_id}&room_id=${notify.room_id}`}>{notify.name} invited you to watch {notify.movie}</Link> <FaTimes onClick={() => setView(false)} color="#eee" className="close" /></p>
      </div>
    </div>
  ) : null;
};

export default Notification;