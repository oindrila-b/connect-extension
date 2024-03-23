import React, { useEffect, useState } from 'react'
import './Tabs.css'
import GithubContent from '../tab-content/github/GithubContent'
import JiraContent from '../tab-content/jira/JiraContent'
import Nango from '@nangohq/frontend'


const Tabs = () => {


  const publicKey = '29db32df-f083-48b3-b3d6-f01945876492'
   
  const githubId = 'github-2'
  const githubConnection = 'test_ob'
  const jiraId='jira-1'
  const jiraConnection='test-connection-id'

  let nango: Nango = new Nango({publicKey: publicKey});

  const handleGithubLogIn = async() => {
    await nango
      .auth(githubId, githubConnection)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
          // Handle failure.
          console.log("Failed to Login")
          alert("Failed to Login")
      });
    
  }

  const handleJiraLogIn = async() => {
    await nango
    .auth(jiraId, jiraConnection)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
        // Handle failure.
        console.log("Failed to Login")
        alert("Failed to Login")
    });
  }

  useEffect(() => {
    nango = new Nango({ publicKey: publicKey })
    console.log("done")
    // handleGithubLogIn()
    // handleJiraLogIn()
  })
  


const [active, setActive] =  useState(1)


const handleActive = (index: number) => {
  setActive(index)
  
}

  return (
    <div>
         <div className="container">
        <div className="bloc-tabs">
          <button className={active  === 1 ? 'tabs g' : 'tabs'} onClick={() => handleActive(1)}>Github</button>
          <button className={active  === 2 ? 'tabs j' : 'tabs'} onClick={() => handleActive(2)}>Jira</button>
        </div>
        <div className='tab-content'>
          {
          active === 1? 
          <div className="github-content">
          <GithubContent nango={nango} />
          </div> 
          :          
          null
          }

          {
          active === 2 ? 
            <div className="jira-content">
               <JiraContent /> 
           </div>
           : 
           null
          }
        </div>
      </div>
    </div>
  )
}

export default Tabs