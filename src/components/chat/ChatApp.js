import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css';

function ChatApp() {
    //   const [messages, setMessages] = useState([]);
    //   const [input, setInput] = useState('');
    //   const bottomRef = useRef(null);

    //   useEffect(() => {
    //     // Simulate receiving a message
    //     const interval = setInterval(() => {
    //       setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text: "Hello there!", sender: "other" }]);
    //     }, 5000);
    //     return () => clearInterval(interval);
    //   }, []);

    //   const sendMessage = (e) => {
    //     e.preventDefault();
    //     if (!input.trim()) return;
    //     const newMessage = { id: Date.now(), text: input, sender: "user" };
    //     setMessages([...messages, newMessage]);
    //     setInput('');
    //     scrollToBottom();
    //   };

    //   const scrollToBottom = () => {
    //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    //   };

    //   return (
    //     <div className="chat-container">
    //       <div className="chat-messages">
    //         {messages.map((message) => (
    //           <div key={message.id} className={`message ${message.sender === "user" ? "user-message" : "other-message"}`}>
    //             {message.text}
    //           </div>
    //         ))}
    //         <div ref={bottomRef}></div>
    //       </div>
    //       <form className="message-form" onSubmit={sendMessage}>
    //         <input
    //           type="text"
    //           value={input}
    //           onChange={(e) => setInput(e.target.value)}
    //           placeholder="Type a message..."
    //           className="message-input"
    //         />
    //         <button type="submit" className="send-button">Send</button>
    //       </form>
    //     </div>
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);
    const broadcastChannel = new BroadcastChannel('chat_channel');

    useEffect(() => {
        // Listen for messages from other tabs
        broadcastChannel.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            broadcastChannel.close();
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        broadcastChannel.postMessage(newMessage);
        setInput('');
        scrollToBottom();
    };

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender === "user" ? "user-message" : "other-message"}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <form className="message-form" onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
}

export default ChatApp;
