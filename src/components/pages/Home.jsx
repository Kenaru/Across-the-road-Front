import React, { useState } from 'react';
import { Box } from '@chakra-ui/react'; // Importer Box de Chakra UI
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Service from '../Service/Service';
import FeedbackSection from '../FeedbackSection/FeedbackSection';
import StatsSection from '../StatsSection/StatsSection';
import About from '../About/About';
import CreateCMS from "../Website/CreateCMS/CreateCMS";


function Home() {
   
    const [showCMSItem, setShowCMSItem] = useState(false);
    const [showCMSPage, setShowPage] = useState(false);

    const toggleCMSItem = () => {
        setShowCMSItem(!showCMSItem);
    };
    const toggleCMSPage = () => {
        setShowPage(!showCMSPage);
    };

    return (
        <Box className="home-container" bgGradient="linear-gradient(270deg, #6f13ad 0%, #010132 100%)" overflowX="hidden" padding="20px">
            <Navbar />
            <About />
            <Service />
            <CreateCMS  toggleCMSItem={toggleCMSItem} toggleCMSPage={toggleCMSPage} />
            <StatsSection />
            <FeedbackSection />
            <Footer />
            
        </Box>
    );
}

export default Home;
