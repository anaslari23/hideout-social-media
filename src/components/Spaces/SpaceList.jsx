import React, { useState, useEffect } from 'react';
import spaceService from '../../services/spaceService';
import SpaceCard from './SpaceCard';
import CreateSpace from './CreateSpace';

const SpaceList = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        try {
            const data = await spaceService.getSpaces();
            setSpaces(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching spaces:', err);
            setLoading(false);
        }
    };

    const handleSpaceCreated = (newSpace) => {
        setSpaces([...spaces, newSpace]);
    };

    if (loading) return <div>Loading spaces...</div>;

    return (
        <div className="spaces-container">
            <CreateSpace onSpaceCreated={handleSpaceCreated} />
            <div className="spaces-grid">
                {spaces.map(space => (
                    <SpaceCard key={space.id} space={space} />
                ))}
            </div>
        </div>
    );
};

export default SpaceList;