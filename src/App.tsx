import React, { useEffect } from 'react';
import './App.css';
import Tabs from './components/tabs/Tabs';
import { initDB } from './components/db/initDB';


function App() {
  
  useEffect(() => {
    handleDBInitialisation()
  })

  const handleDBInitialisation = async () => {
    const status =  await initDB();
    status ? console.log("DB IS READY") : console.log("DB IS GETTING INITIALISED")
  }


  return (
    <div className="App">
     <Tabs />
    </div>
  );
}

export default App;
