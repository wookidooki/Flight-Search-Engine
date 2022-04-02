import React from 'react'
import { BrowserRouter } from "react-router-dom";
import Router from './routes';

// This is the entry point of the component where we have imported the route file and used of it
const App = () => {
    return ( <
        div >
        <
        BrowserRouter >
        <
        Router / >
        <
        /BrowserRouter> <
        /div>
    );
}

export default App;