import React, { useState, useEffect } from 'react';
// import axios from "axios";
import io from "socket.io-client";

const Notification = () => {
  const [note, setNote] = useState({});
  const [view, setView] = useState(false);
  useEffect( () => {
  const socket = io.connect("https://movie-stream-api.herokuapp.com");
  // const socket = {on: function(){}, emit: function() {}};
  console.log(socket);
  socket.on("connect", (ev) => {
    socket.emit("online", { name: "Me" });
  });

  socket.on("resp", (resp_data) => {
    // alert("Resp");
    console.log("Resp: ", resp_data);
  });

  socket.on("status_change", (data) => {
    console.log("Status Changed: ", data);
  });

  socket.emit("online", {
    name: "Spiff Jekey-Green"
  });

  // socket.onAny((ev) => console.log("Events: ", ev));

  socket.on("Invited", (data) => {
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