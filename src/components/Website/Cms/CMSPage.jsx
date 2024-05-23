import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Import Box from Chakra UI for styling

// Import StatsSection component
import StatsSection from './StatsSection';
import { Box } from '@chakra-ui/react';

// Importing other components dynamically based on fetched data also find a way to implement this is the back end 
const componentImports = {
  Navbar: React.lazy(() => import('./Navbar')),
  About: React.lazy(() => import('./About')),
  FeedbackSection: React.lazy(() => import('./FeedbackSection')),
  Service: React.lazy(() => import('./Service')),
  Footer: React.lazy(() => import('./Footer')),
  StatsSection: StatsSection, // Include StatsSection in componentImports
};

const CMSPage = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Fetch page data based on the ID
    const fetchData = async () => {
      try {
        const response = await axios.get(`/AssoWebsite/${id}`);
        setPageData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pageData) {
    return <div>No data found for this page.</div>;
  }

  // Render components based on page data
  const renderComponents = () => {
    return pageData.components.map((component, index) => {
      const Component = componentImports[component.type];
      if (!Component) return null; 

      return (
        <React.Suspense key={index} fallback={<div>Loading...</div>}>
           
            <Component content={component.content} />
        
        </React.Suspense>
      );
    });
  };

  return (
    <Box bg="#010132">
    <React.Suspense fallback={<div>Loading...</div>}>
      {renderComponents()}
    </React.Suspense>
    </Box>
  );
};

export default CMSPage;


