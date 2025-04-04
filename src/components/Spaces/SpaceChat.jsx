import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const SpaceChat = () => {
    const { spaceId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef();
    const messagesEndRef = useRef();

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_URL, {
            query: { spaceId },
            auth: { token: localStorage.getItem('token') }
        });

        socketRef.current.on('message', (newMessage) => {
            setMessages(prev => [...prev, newMessage]);
        });

        return () => socketRef.current.disconnect();
    }, [spaceId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        socketRef.current.emit('sendMessage', {
            spaceId,
            content: message
        });
        setMessage('');
    };

    return (
        <div className="space-chat">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span className="message-user">{msg.username}</span>
                        <p className="message-content">{msg.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default SpaceChat;