import React, { useRef } from "react";
import "../newstyle.css";
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
    const socket = io("https://livechat23.adaptable.app",);
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
        // refbox.current.scrollIntoView({ behavior: "smooth" });
        setMsg("");
      });
    }
  }, [socket, allMessage]);

  useEffect(() => {
    setData(location.state);
    // console.log(data);
  }, [location.state]);
  const handleEnter = (e) => (e.keyCode === 13 ? onSubmit() : "");

  const onSubmit = () => {
    if (msg) {
      const newMessage = { time: new Date(), msg, name: data.name };
      socket.emit("newMessage", { newMessage, room: data.room });
      refbox.current.scrollIntoView({ behavior: "smooth" });


      setMsg("");
    }

    // setallMessage([...allMessage, newMessage]);
  };
  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <>

      <div className="w-screen flex h-screen main gap-8  justify-center items-center">
        <div className=" bg-black cover w-1/2 h-1/2">
          <img src="/bg-chat-1.jpg" className="w-full h-full" alt="" />
        </div>

        <div className="flex flex-col rounded-3xl overflow-hidden">

          <div
            className=" bg-pink-600 overflow-auto h-screen w-screen chatscreen   p-3 "
          // style={{  overflowY: "auto" }}
          >
            <div className=" p-3  bg-pink-200 text-pink-700  rounded-2xl myshadow text-capitalize">
              <h1 className="font-bold p-2 text-center  text-2xl ">{data.room} Room</h1>
            </div>
            {allMessage.map((msg) => {
              // console.log(msg);
              return data.name === msg.name ? (
                <>
                  <div key={msg.msg} className=" bg-info float-right clear-both mt-2  bg-purple-100 rounded w-auto">
                    <div>
                      <strong className="m-1 p-2">
                        {msg.name}
                      </strong>
                      <Moment fromNow ago className="text-sm p-2">
                        {msg.time}
                      </Moment>
                    </div>
                    <h4 className="m-1 p-2">{msg.msg}</h4>
                  </div>
                </>
              ) : (
                <div className=" bg-info float-left clear-both mt-2 bg-purple-800 text-white  rounded w-auto">
                  <div>
                    <strong className="m-1 p-2">
                      {msg.name}
                    </strong>
                    <Moment fromNow ago className="text-sm p-2">
                      {msg.time}
                    </Moment>
                  </div>
                  <h4 className="m-1 p-2">{msg.msg}</h4>
                </div>
              );
            })}

            <div ref={refbox} className="divs"></div>
            <div className=" bg-pink-600  p-4 flex w-full justify-between">
              <input
                type="text"
                className=" w-full p-2 font-bold focus:outline-none rounded-sm"
                name="message"
                placeholder="Type here...."
                value={msg}
                onChange={handleChange}
                onKeyDown={handleEnter}
              />
              <button
                type="button"
                className=" font-bold p-2 rounded-md ml-2 bg-pink-200 "
                onClick={onSubmit}
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Chatroom;
