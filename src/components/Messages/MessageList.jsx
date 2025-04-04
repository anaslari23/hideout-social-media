import React, { useState, useEffect } from 'react';
import messageService from '../../services/messageService';
import ConversationList from './ConversationList';
import MessageChat from './MessageChat';

const MessageList = () => {
    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const data = await messageService.getConversations();
            setConversations(data);
        } catch (err) {
            console.error('Error fetching conversations:', err);
        }
    };

    return (
        <div className="messages-container">
            <ConversationList 
                conversations={conversations}
                onSelectChat={setActiveChat}
                activeChat={activeChat}
            />
            {activeChat && (
                <MessageChat 
                    conversation={activeChat}
                    onNewMessage={fetchConversations}
                />
            )}
        </div>
    );
};

export default MessageList;