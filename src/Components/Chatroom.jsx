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
    const socket = io("https://livechat.adaptable.app");
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
  const handleEnter = e=> e.keyCode === 13 ? onSubmit() : "";

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
      <div className="container py-4 m-5 w-50 shadow bg-white text-dark border rounded">
        <div className="text-center px-3 mb-4 text-capitalize">
          <h1 className="text-warning mb-4">{data?.room} Room</h1>
        </div>
        <div
          className="bg-light border rounded p-3 mb-4 "
          style={{ height: "450px", overflowY: "auto" }}
        >
          {allMessage.map((msg) => {
            // console.log(msg);
            return data.name === msg.name ? (
              <>
                <div className="row myFlex pl-5">
                  <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto">
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
              <div className="row justify-start ">
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

          <div className="form-group d-flex">
            <input
              type="text bg-light"
              className="form-control "
              name="message"
              placeholder="Please type your message here...."
              value={msg}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
            <button
              type="button"
              className="btn btn-warning mx-2"
              onClick={onSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
