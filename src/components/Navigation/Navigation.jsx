import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="main-nav">
            <div className="nav-logo">
                <Link to="/">Hideout</Link>
            </div>
            
            <div className="nav-links">
                <Link to="/">Feed</Link>
                <Link to="/threads">Threads</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/films">Films</Link>
                <Link to="/spaces">Spaces</Link>
            </div>
            
            <div className="nav-actions">
                <span className="user-name">{user.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navigation;