import React, { useEffect, useState } from 'react'
import './JiraContent.css'
import { JiraIssueModel } from '../asset/models/JiraIssueModel'
import { JiraProjectModel } from '../asset/models/JiraProjectModel'
import Nango from '@nangohq/frontend'
import { Stores, addData } from '../../../initDB'
import JiraIssueTab from './JiraIssueTab'
import JiraProjectTab from './JiraProjectTab'


const JiraContent = () => {

  const [active, setActive] =  useState(1)
  const [subTab, seSubTab] = useState(1)
  
  const baseURL = 'https://external-access-server.onrender.com/list/jira'
  const [jiraIssues, setJiraIssues] = useState<JiraIssueModel[]>([])
  const [jiraProjects, setJiraProjects] = useState<JiraProjectModel[]>([])


  const fetchIssue = async() => {
    const response = await fetch(`${baseURL}/issues`)
    const data = await response.json()
    console.log(data)
    setJiraIssues(data)
  }

  const fetchProjects= async() => {
    const response = await fetch(`${baseURL}/projects`)
    const data = await response.json()
    console.log(data)
    setJiraProjects(data)
  }

  useEffect(() => {
    fetchIssue()
    fetchProjects()
  },[])


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
            <JiraIssueTab issue={jiraIssues} storage={Stores.JiraIssue} />
          </div> : null}
          {active === 2 ? <div className="projects-content">
           <JiraProjectTab project={jiraProjects} storage={Stores.JiraProject} />
          </div> : null}
        </div>  
       </div>
  )
}

export default JiraContent