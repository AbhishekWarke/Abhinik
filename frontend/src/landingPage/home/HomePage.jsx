import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Strength from './Strength';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Awards from './Awards';

function HomePage() {
    return ( 
        <>
        <Hero />
        <Awards/>
        <Stats />
        <Strength/>
        </>
     );
}

export default HomePage;