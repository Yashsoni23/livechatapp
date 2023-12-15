import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import { io } from "socket.io-client";
const Chatroom = () => {
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [socket, setsocket] = useState(io);
  const [allMessage, setallMessage] = useState([]);
  const location = useLocation();

  const refbox = useRef();
  useEffect(() => {
    // const socket = io("http://localhost:9000");
    const socket = io("https://livechat23.adaptable.app");
    setsocket(socket);
    socket.on("connect", () => {
      // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.emit("joinroom", location.state.room);
    });
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("getLatestMessage", (newMessage) => {
        setallMessage([...allMessage, newMessage]);
        refbox.current.scrollIntoView({ behavior: "smooth" });
        setMsg("");
      });
    }
  }, [socket, allMessage]);

  useEffect(() => {
    setData(location.state);
    // console.log(data);
  }, [location]);
  const handleEnter = (e) => (e.keyCode === 13 ? onSubmit() : "");

  const onSubmit = () => {
    if (msg) {
      const newMessage = { time: new Date(), msg, name: data.name };
      socket.emit("newMessage", { newMessage, room: data.room });
      refbox.current.scrollIntoView({ behavior: "smooth" });

      // refbox.current.scrollIntoView({ behavior: "smooth" });

      setMsg("");
    }

    // setallMessage([...allMessage, newMessage]);
  };
  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <>
      <div className="container py-4 h-screen w-screen shadow bg-pink-300 text-dark border rounded">
        <div className="text-center px-3 mb-4 text-capitalize">
          <h1 className="text-pink-700 font-bold text-2xl mb-4">
            {data?.room} Room
          </h1>
        </div>
        <div
          className="bg-pink-100 border chatscreen rounded p-3 mb-4 "
          style={{ height: "80vh", overflowY: "auto" }}
        >
          {allMessage.map((msg) => {
            // console.log(msg);
            return data.name === msg.name ? (
              <>
                <div
                  className="justify-end float-right clear-both"
                  key={msg.msg}
                >
                  <div className=" flex-column float-right align-items-end m-2 shadow p-2 bg-pink-500 text-white border rounded w-auto">
                    <div>
                      <strong className="m-1">{msg.name}</strong>
                      <Moment fromNow ago>
                        {msg.time}
                      </Moment>
                    </div>
                    <h4 className="m-1">{msg.msg}</h4>
                  </div>
                </div>
              </>
            ) : (
              <div className="row justify-start clear-both" key={msg.msg}>
                <div className="d-flex flex-column m-2 shadow p-2 bg-white border rounded w-auto">
                  <div>
                    <strong className="m-1">{msg.name}</strong>
                    <Moment fromNow ago>
                      {msg.time}
                    </Moment>
                  </div>
                  <h4 className="m-1">{msg.msg}</h4>
                </div>
              </div>
            );
          })}
          <div ref={refbox} className="divs"></div>
        </div>
        <div className=" justify-center items-center d-flex">
          <input
            type="text bg-light"
            className="h-max  w-full pl-4 py-1 font-semibold text-xl focus:outline-8 focus:border-4 rounded-lg focus:outline-none focus:border-pink-400 focus:outline-pink-400"
            name="message"
            placeholder="type your message ...."
            value={msg}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <button
            type="button"
            className=" bg-pink-500 text-white p-2 rounded-xl hover:bg-pink-700 btn-danger  mx-2"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
