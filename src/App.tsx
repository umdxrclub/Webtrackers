import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { load_opencv } from './opencv';
import { Webtrack } from './webtrack';

function App() {
  useEffect(() => {
      load_opencv().then(cv => {
        console.log("Loaded OpenCV!");
      })
  }, [])

  return (
    <div className="App">
      <Container>
        <Webtrack />
      </Container>
      
    </div>
  );
}

export default App;
