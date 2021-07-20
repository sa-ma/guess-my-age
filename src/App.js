import React, { useState } from 'react';
import Tracker from '@openreplay/tracker';
import './App.css';

const tracker = new Tracker({
  projectKey: 'sXetSdcGlFjazZA9TkXR',
  ingestPoint: 'https://app.openreplaytutorial.ga/ingest',
});
tracker.start();

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const { age } = await response.json();
      setIsLoading(false);
      if (age === null) {
        setIsError(true);
        throw new Error('Error fetching age');
      }
      setAge(age);
      return;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
      throw new Error('Error getting data');
    }
  };
  return (
    <main>
      <h1> Guess your Age</h1>
      <input
        type="text"
        aria-label="Enter your name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button onClick={handleSubmit}>Submit</button>
      {isLoading && <p>Guessing age...</p>}
      {!isLoading && isError && <p>Error guessing age</p>}
      {!isLoading && age > 0 && age !== null && (
        <p>Your are {age} years old.</p>
      )}
    </main>
  );
}

export default App;
