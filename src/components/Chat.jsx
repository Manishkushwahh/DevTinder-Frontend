import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {targetUserId} = useParams();
    // console.log(targetUserId);

    const user = useSelector((store) => store.user);
    const userId = user?._id;
    // console.log(userId);

    const fetchChatMessages = async () => {
        try {
            const chat = await axios.get(
                BASE_URL + "/chat/" + targetUserId,
                {withCredentials: true}
            );
            console.log(chat.data.messages);

            const chatMessage = chat?.data?.messages.map((msg) => {
                const {senderId, text} = msg;
                return{
                    firstName: senderId?.firstName,
                    lastName: senderId?.lastName,
                    text
                };
            });
            setMessages(chatMessage);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {

        if(!userId){
            return;
        }
        const socket = createSocketConnection();
        // As soon as page loads joinChat Socket on's
        socket.emit("joinChat", {userId, targetUserId, firstName: user.firstName});
        // When page is unload or unmount then disconnect the socket


        socket.on("messageReceived", ({firstName, text}) => {
            console.log(firstName + " : " + text);
            setMessages((messages) => [...messages, {firstName, text}]);
        })
        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const handleSendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
    }


    return (
        <div className="flex justify-center items-center">
        <div className="flex flex-col w-3/4 h-[70vh] border border-gray-100 m-5">
            <div className="p-2 text-center">Chat</div>
            <hr></hr>
            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg, index)=> {
                    return (
                    <div 
                    key={index}
                    className={"chat " + ((user.firstName === msg.firstName) ? "chat-end" : "chat-start")}>
                        <div className="chat-bubble">{msg.text}</div>
                    </div>
                    )
                })}
            </div>
            <hr></hr>
            <div className="flex justify-center items-center gap-5 py-3 px-10">
                <input 
                className="border border-gray-300 p-2 w-full bg-black text-white"
                type="text"
                placeholder="Send Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}></input>
                <button type="button" className="btn btn-primary"
                onClick={handleSendMessage}>Send</button>
            </div>
        </div>
        </div>
    )
};

export default Chat;