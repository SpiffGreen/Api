import React, { useState, useEffect } from 'react';
// import axios from "axios";
import io from "socket.io-client";

const Notification = () => {
  const [note, setNote] = useState({});
  const [view, setView] = useState(false);
  useEffect( () => {
  const socket = io.connect("https://movie-stream-api.herokuapp.com/api/");
  socket.on("connect", () => {
    socket.emit("online", { name: "Me" });
  });

  socket.on("resp", () => alert("Resp"));

  socket.on("Invited", (data) => {
    // data-> link, name, movie
    console.log(data);
    setNote(data);
    setView(true);
  })
  
  }, []);
  return view ? (
    <div className="notif">
      <p>Notification <button onClick={() => setView(false)}>close</button></p>
      <a href={`movies-stream-api.herokuapp.com/watch/${note.movie_id}`}>{note.name} invited you to watch {note.movie}</a>
    </div>
  ) : null;
};

export default Notification;