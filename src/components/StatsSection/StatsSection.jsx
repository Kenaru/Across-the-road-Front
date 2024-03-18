import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, SimpleGrid, Center } from '@chakra-ui/react';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts';

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalTables: 0,
    totalElements: 0,
    maxElementsInTable: 0,
    numWebsites: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/websitePages');
        const websitePages = response.data;
        const newStats = computeStats(websitePages);
        setStats(newStats);
      } catch (error) {
        console.error('Error fetching website pages:', error);
      }
    };

    fetchStats();
  }, []);

  const computeStats = (pages) => {
    let totalTables = 0;
    let totalElements = 0;
    let maxElementsInTable = 0;
    let numWebsites = 0;

    pages.forEach((page) => {
      if (page.formData && page.formData.title) {
        numWebsites++;
      }

      page.components.forEach((component) => {
        totalTables++;
        const elementCount = Object.keys(component).length;
        totalElements += elementCount;

        if (elementCount > maxElementsInTable) {
          maxElementsInTable = elementCount;
        }
      });
    });

    return { totalTables, totalElements, maxElementsInTable, numWebsites };
  };

  const data = [
    { name: 'Total Websites', value: stats.numWebsites },
    { name: 'Total Tables', value: stats.totalTables },
    { name: 'Total Elements', value: stats.totalElements },
    { name: 'Max Elements in Table', value: stats.maxElementsInTable },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box
      bgGradient="linear-gradient(270deg, #6f13ad 0%, #010132 100%)"
      color="white"
      p="4"
      borderRadius="md"
      border="1px solid white"
      backgroundPosition="center"
    >
      <Box
        p="6"
        borderRadius="lg"
        mb="4"
        padding="4rem"
        textAlign="center"
        style={{
          backgroundImage: `url('../Website/assets/back2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Heading as="h2" size="lg" mb="2" color="white">
          Overview
        </Heading>
        <Text color="white">
          Here you can find some real-time statistics about website data.
        </Text>
      </Box>
      <Heading as="h2" size="lg" mb="4" color="gray.200">
        Real-Time Stats
      </Heading>
      <Center>
        <SimpleGrid columns={2} spacing={4} justifyItems="center">
          {data.map((entry, index) => (
            <Box key={entry.name} textAlign="center">
              <PieChart width={200} height={200}>
                <Pie
                  data={[entry]}
                  cx={100}
                  cy={100}
                  innerRadius={40}
                  outerRadius={80}
                  fill={COLORS[index % COLORS.length]}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <Text color="white" fontSize="xl" mt={4}>
                {entry.value}
              </Text>
              <Text color="gray.300">{entry.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default StatsSection;
