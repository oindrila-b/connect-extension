import React, { useEffect, useState } from 'react';
import './App.css';
import Tabs from './components/tabs/Tabs';
import { initDB } from './initDB';
import Nango from '@nangohq/frontend';


function App() {

  let nango: Nango;
  

  const publicKey = '29db32df-f083-48b3-b3d6-f01945876492'
  const githubId = 'github-2'
  const githubConnection = 'test_ob';
  const jiraId='jira-1'
  const jiraConnection='test-connection-id'


  const [githubLogin, setGithubLogin] = useState(false)
  const [jiraLogin, setjiraLogin] = useState(false)

  useEffect(() => {
    handleDBInitialisation()
    nango = new Nango({publicKey: publicKey})
    let githubStatus = localStorage.getItem("github") as string;
    githubStatus === "true" ? setGithubLogin(true): setGithubLogin(false)
    let jiraStatus = localStorage.getItem("jira") as string;
    jiraStatus === "true" ? setjiraLogin(true): setjiraLogin(false)
  })

  const handleDBInitialisation = async () => {
    const status = await initDB();
    status ? console.log("DB IS READY") : console.log("DB IS GETTING INITIALISED")
  }

  const handleGithubLogIn = async() => {
    await nango
      .auth(githubId, githubConnection)
      .then((result) => {
        console.log(result)
        alert("Github Login successful")
      })
      .catch((error) => {
          // Handle failure.
          console.log("Failed to Login")
      });
      setGithubLogin(true)
      localStorage.setItem("github", "true")
  }

  const handleJiraLogIn = async() => {
    await nango
    .auth(jiraId, jiraConnection)
    .then((result) => {
      console.log(result)
      alert("Jira Login successful")
    })
    .catch((error) => {
        // Handle failure.
        console.log("Failed to Login")
    });
    setjiraLogin(true)
    localStorage.setItem("jira", "true")
  }

  

  return (
    <div className="App">
      {(!githubLogin || !jiraLogin) ?
        <>
          <div className='login-button github-lg' onClick={handleGithubLogIn}>
            Github
          </div>
          <div className='login-button jira-lg' onClick={handleJiraLogIn}>
            Jira
          </div>
        </>
        :
       <div>
         <Tabs />
       </div>
      }
    </div>
  );
}

export default App;
