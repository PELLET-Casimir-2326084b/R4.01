import React from 'react';
import './App.css';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Body from '../body/Body.js';
import { DataProvider, useData } from '../data/DataContext'; // Import du DataContext

function App() {
    return (
        <DataProvider>
            <div className="App">
                <Header />
                <Body />
                <Footer />
            </div>
        </DataProvider>
    );
}

export default App;
