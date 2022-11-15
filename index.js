const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {Server} = require("socket.io");
const http = require("http");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"https://chatlive.adaptable.app",
        methods:["GET","POST"]
    }
})
io.on("connection", (socket) => {
    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.on("joinroom",room=>socket.join(room));
    socket.on("newMessage",({newMessage,room})=>{
        io.in(room).emit("getLatestMessage",newMessage);
    });
  });

app.get("/",(req,res)=>{
    res.send("socket chat BE started")
})

server.listen(port,()=>{
    console.log(`app started at port ${port}`);
})
