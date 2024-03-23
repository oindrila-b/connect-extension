import React, { useEffect } from 'react';
import './App.css';
import Tabs from './components/tabs/Tabs';
import { initDB } from './components/db/initDB'

function App() {

  useEffect(() => {
    handleDBInitialisation()
  })

  const handleDBInitialisation = async () => {
    const status = await initDB()
    console.log("DB IS READY")
  }


  return (
    <div className="App">
     <Tabs/>
    </div>
  );
}

export default App;
