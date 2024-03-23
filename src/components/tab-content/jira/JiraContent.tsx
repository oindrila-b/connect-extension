import React, { useState } from 'react'
import './JiraContent.css'
import { GithubContentItem } from '../asset/GithubContentItem'

const JiraContent = () => {

  const [active, setActive] =  useState(1)

const handleActive = (index: number) => {
  setActive(index)
}

  return (
   
       <div className='container'>
       <div className="bloc-tabs">
          <button className={active  === 1 ? 'j-entity issue' : 'j-entity'} onClick={() => handleActive(1)}>Issues</button>
          <button className={active  === 2 ? 'j-entity projects' : 'j-entity'} onClick={() => handleActive(2)}>Projects</button>
        </div>
        <div className="entity-content">
        {active === 1 ? <div className="issue-content">
            <GithubContentItem name='olaa' url='lolllaa'/>
          </div> : null}
          {active === 2 ? <div className="projects-content">
            <GithubContentItem name='olaa' url='lolllaa' owner='lola'/>
          </div> : null}
        </div>  
       </div>
  )
}

export default JiraContent