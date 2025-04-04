import React, { useState, useEffect } from 'react';
import threadService from '../../services/threadService';
import ThreadItem from './ThreadItem';
import CreateThread from './CreateThread';

const ThreadList = () => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        try {
            const data = await threadService.getThread();
            setThreads(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleNewThread = async (thread) => {
        setThreads([thread, ...threads]);
    };

    if (loading) return <div>Loading threads...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="thread-list">
            <CreateThread onThreadCreated={handleNewThread} />
            {threads.map(thread => (
                <ThreadItem 
                    key={thread.id} 
                    thread={thread} 
                    onReply={fetchThreads}
                />
            ))}
        </div>
    );
};

export default ThreadList;