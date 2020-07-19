import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Race, Home } from './Components';

export const App = () => {
    
    return (
        <div className='wrapper'>
            <Router>
                <Routes>
                <Route path="" element={<Home />}/>
                    <Route path="/Race" element={<Race />} />
                </Routes>
            </Router>
        </div>
    );
}