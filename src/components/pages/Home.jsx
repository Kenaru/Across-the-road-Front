import React from 'react';
import '../../Sass/Home.scss';
import  Navbar from '../Navbar/Navbar';
import  Footer from '../Footer/Footer';
import ServicesSection from './ServicesSection';
import FeedbackSection from './FeedbackSection';
import StatsSection from './StatsSection';
import About from './About';
function Home() {

    return (
        <div className="home-container">
        <Navbar/>
        <About/>
        <ServicesSection/>
        <FeedbackSection/>
        <StatsSection/>
        <Footer/>
        

        </div>
    );
}

export default Home;
