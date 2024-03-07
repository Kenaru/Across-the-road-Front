import React, { useState } from 'react';
import '../../Sass/Home.scss';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Service from '../Service/Service';
import FeedbackSection from '../FeedbackSection/FeedbackSection';
import StatsSection from '../StatsSection/StatsSection';
import About from '../About/About';
import CreateCMS from "../Website/CreateCMS/CreateCMS";
import CMS from "../Website/Cms/CMS";

function Home() {
    const [showCMS, setShowCMS] = useState(false);

    const toggleCMS = () => {
        setShowCMS(!showCMS);
    };

    return (
        <div className="home-container">
            <Navbar />
            <About />
            <Service />
            <CreateCMS toggleCMS={toggleCMS} />
            <StatsSection />
            <FeedbackSection />
            <Footer />
            {showCMS && <CMS />}
        </div>
    );
}

export default Home;
