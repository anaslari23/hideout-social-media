import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThreadList from './components/Thread/ThreadList';
import FeedList from './components/Feed/FeedList';
import MessageList from './components/Messages/MessageList';
import FilmList from './components/Films/FilmList';
import SpaceList from './components/Spaces/SpaceList';
import Navigation from './components/Navigation/Navigation';
import './components/Thread/Thread.css';
import './components/Feed/Feed.css';
import './components/Messages/Messages.css';

function App() {
    return (
        <Router>
            <Navigation />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<FeedList />} />
                    <Route path="/threads" element={<ThreadList />} />
                    <Route path="/messages" element={<MessageList />} />
                    <Route path="/films" element={<FilmList />} />
                    <Route path="/spaces" element={<SpaceList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;