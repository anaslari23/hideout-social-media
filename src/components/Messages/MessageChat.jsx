import React, { useState, useEffect, useRef } from 'react';
import messageService from '../../services/messageService';

const MessageChat = ({ conversation, onNewMessage }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [conversation.id]);

    const fetchMessages = async () => {
        try {
            const data = await messageService.getMessages(conversation.id);
            setMessages(data);
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await messageService.sendMessage(conversation.id, newMessage);
            setNewMessage('');
            fetchMessages();
            if (onNewMessage) onNewMessage();
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className="message-chat">
            <div className="chat-header">
                <img 
                    src={conversation.profile_pic || '/default-avatar.png'} 
                    alt={conversation.username} 
                    className="avatar"
                />
                <span className="username">{conversation.username}</span>
            </div>

            <div className="messages-list">
                {messages.map(message => (
                    <div 
                        key={message.id}
                        className={`message ${message.is_sender ? 'sent' : 'received'}`}
                    >
                        <p className="message-content">{message.content}</p>
                        <span className="message-time">
                            {new Date(message.sent_at).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default MessageChat;