import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Home} path="/" />
                <Route Component={CreatePoint} path='/create-point'/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;