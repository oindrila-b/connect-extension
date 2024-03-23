import React, { useEffect, useState } from 'react'
import './Tabs.css'
import GithubContent from '../tab-content/github/GithubContent'
import JiraContent from '../tab-content/jira/JiraContent'
import Nango from '@nangohq/frontend'


const Tabs = () => {

const [active, setActive] =  useState(1)

const [gloggedIn, isGithubLoggedIn] = useState(false)
const [jLoggedIn, isJiraLoggedIn] = useState(false)


let nango: Nango;
const publicKey = '29db32df-f083-48b3-b3d6-f01945876492'
const githubId = 'github-2'
const githubConnection = 'test_ob'
const jiraId='jira-1'
const jiraConnection='test-connection-id'


useEffect(() => {
  nango = new Nango({ publicKey: publicKey })
})

const handleActive = (index: number) => {
  setActive(index)
  
}

const handleGithubLogIn = () => {
  nango
    .auth(githubId, githubConnection)
    .then((result) => {
      console.log(result)
      isGithubLoggedIn(true)
    })
    .catch((error) => {
        // Handle failure.
        console.log("Failed to Login")
        alert("Failed to Login")
    });
  
}
const handleJiraLogIn = () => {
  nango
  .auth(jiraId, jiraConnection)
  .then((result) => {
    console.log(result)
    isJiraLoggedIn(true)
  })
  .catch((error) => {
      // Handle failure.
      console.log("Failed to Login")
      alert("Failed to Login")
  });
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
           {gloggedIn ? 
                <>  <GithubContent /> </> :  
                <div className='login-button'>
                     <button onClick={handleGithubLogIn} className='github-lg' > 
                        Login to Github 
                     </button>
                </div>}
          </div> 
          :          
          null
          }

          {
          active === 2 ? 
            <div className="jira-content">
                {
                  jLoggedIn ? 
                    <> <JiraContent /> </>
                    :
                    <div className='login-button'>
                      <button onClick={handleJiraLogIn} className='jira-lg'>
                          Login to Jira   
                      </button>
                    </div>
                }
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