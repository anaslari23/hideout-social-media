import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ThreadList from './components/Thread/ThreadList';
import FeedList from './components/Feed/FeedList';
import MessageList from './components/Messages/MessageList';
import FilmList from './components/Films/FilmList';
import SpaceList from './components/Spaces/SpaceList';
import Navigation from './components/Navigation/Navigation';
import './components/Auth/Auth.css';
import './components/Thread/Thread.css';
import './components/Feed/Feed.css';
import './components/Messages/Messages.css';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Navigation />
                            <FeedList />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/threads" element={
                        <ProtectedRoute>
                            <Navigation />
                            <ThreadList />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/messages" element={
                        <ProtectedRoute>
                            <Navigation />
                            <MessageList />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/films" element={
                        <ProtectedRoute>
                            <Navigation />
                            <FilmList />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/spaces" element={
                        <ProtectedRoute>
                            <Navigation />
                            <SpaceList />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;