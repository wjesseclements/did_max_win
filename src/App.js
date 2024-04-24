import React, { useState } from 'react';
import { Button, Text, VStack } from '@chakra-ui/react';

function App() {
  const [result, setResult] = useState('Click the button to check if Max won the last race!');

  const checkIfMaxWon = async () => {
    const url = "https://ergast.com/api/f1/current/last/results.json";  // The API endpoint
    try {
      const response = await fetch(url);
      const data = await response.json();
      const winner = data.MRData.RaceTable.Races[0].Results[0].Driver.driverId;
      setResult(winner === 'max_verstappen' ? "Yes, Max won!" : "No, Max didn't win.");
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Failed to fetch data. Please try again.');
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Text fontSize="2xl">{result}</Text>
      <Button colorScheme="teal" onClick={checkIfMaxWon} size="lg">
        Check Now
      </Button>
    </VStack>
  );
}

export default App;
