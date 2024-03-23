import React, { useEffect, useState } from 'react'
import './Tabs.css'
import GithubContent from '../tab-content/github/GithubContent'
import JiraContent from '../tab-content/jira/JiraContent'
import Nango from '@nangohq/frontend'


const Tabs = () => {


  const publicKey = '29db32df-f083-48b3-b3d6-f01945876492'
  let nango: Nango = new Nango({publicKey: publicKey});

  useEffect(() => {
    nango = new Nango({ publicKey: publicKey })
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