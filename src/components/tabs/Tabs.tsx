import React, { useState } from 'react'
import './Tabs.css'
import GithubContent from '../tab-content/github/GithubContent'

const Tabs = () => {

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
          {active === 1 ? <div className="github-content">
            <GithubContent />
          </div> : null}
          {active === 2 ? <div className="jira-content">
          <h1> HELLO JIRA </h1>
          </div>:null}
        </div>
      </div>
    </div>
  )
}

export default Tabs