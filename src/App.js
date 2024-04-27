import React, { useState } from 'react';
import { Button, Text, VStack, Box, useColorModeValue, Image } from '@chakra-ui/react';

function App() {
  const [result, setResult] = useState('Click the button to check if Max won the last race!');

  const checkIfMaxWon = async () => {
    const url = "https://ergast.com/api/f1/current/last/results.json";
    setResult('Checking...');  // Set an initial loading state
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

  // Using useColorModeValue to switch color based on the theme (light/dark)
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.50");

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" p={5}>
      <VStack spacing={4} align="center" justify="center">
        <Image src="https://example.com/your-image.jpg" alt="Formula 1" boxSize="150px" />
        <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight="bold">{result}</Text>
        <Button colorScheme="red" size="lg" onClick={checkIfMaxWon}>
          Check Now
        </Button>
      </VStack>
    </Box>
  );
}

export default App;
