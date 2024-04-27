import React, { useState, useEffect } from 'react';
import { Button, Text, VStack, Box, useColorModeValue, Image } from '@chakra-ui/react';

function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceInfo = async () => {
      const url = "https://ergast.com/api/f1/current/last/results.json";
      try {
        const response = await fetch(url);
        const data = await response.json();
        const race = data.MRData.RaceTable.Races[0];
        const raceName = race.raceName;
        const date = new Date(race.date).toLocaleDateString(); // Format date as needed
        setResult(`Did Max Verstappen win the ${raceName} on ${date}?`);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching race info:', error);
        setResult('Failed to fetch race information. Please try again.');
        setLoading(false);
      }
    };

    fetchRaceInfo();
  }, []);

  const checkIfMaxWon = async () => {
    setLoading(true);
    const url = "https://ergast.com/api/f1/current/last/results.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      const winner = data.MRData.RaceTable.Races[0].Results[0].Driver.driverId;
      setResult(winner === 'max_verstappen' ? "Yes, Max won!" : "No, Max didn't win.");
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.50");

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" p={5}>
      <VStack spacing={4} align="center" justify="center">
        <Image src="https://example.com/your-image.jpg" alt="Formula 1" boxSize="150px" />
        <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight="bold">
          {loading ? 'Loading...' : result}
        </Text>
        <Button colorScheme="red" size="lg" onClick={checkIfMaxWon} isLoading={loading}>
          Check Now
        </Button>
      </VStack>
    </Box>
  );
}

export default App;
