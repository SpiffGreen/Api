import React, { useState, useEffect, useContext, useRef } from 'react';
// import axios from "axios";
import io from "socket.io-client";
import { NotificationContext } from '../NotificationContext';

const Notification = () => {
  const [note, setNote] = useState({});
  const [view, setView] = useState(false);
  const {notify, setNotify} = useContext(NotificationContext);

  const socket = useRef();

  useEffect(() => {
    if(notify.val) {
      socket.current.emit("Invited",  {
        link: window.location.href,
        name: notify.user,
        movie: notify.movie_name
      }, () => {
        console.log(`Sent invite for ${notify.movie_name} to ${notify.user}`);
        setNotify(prev => {
          return {...prev, val: false};
        });
      })
    }
  }, [notify]);

  useEffect( () => {
  socket.current = io.connect("https://movie-stream-api.herokuapp.com");
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
    console.log("Invited: ", data);
    setNote(data);
    setView(true);
  })
  
  }, []);
  return view ? (
    <div className="notif">
      <p>Notification <button onClick={() => setView(false)}>close</button></p>
      <a href={`/watch/${note.movie_id}`}>{note.name} invited you to watch {note.movie}</a>
    </div>
  ) : null;
};

export default Notification;