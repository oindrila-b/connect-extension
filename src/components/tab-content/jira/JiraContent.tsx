import React, { useEffect, useState } from 'react'
import './JiraContent.css'
import { JiraIssueContent } from '../asset/jira-content/JiraIssueContent'
import { JiraProjectContent } from '../asset/jira-content/JiraProjectContent'
import { JiraIssueModel } from '../asset/models/JiraIssueModel'
import { JiraProjectModel } from '../asset/models/JiraProjectModel'
import Nango from '@nangohq/frontend'


const JiraContent = () => {

  let nango:Nango;
  const jiraId='jira-1'
  const jiraConnection='test-connection-id'
  const publicKey = '29db32df-f083-48b3-b3d6-f01945876492'

  const [active, setActive] =  useState(1)
  const baseURL = 'http://127.0.0.1:5000/list/jira'
  const [jiraIssues, setJiraIssues] = useState<JiraIssueModel[]>([])
  const [jiraProjects, setJiraProjects] = useState<JiraProjectModel[]>([])


  const handleJiraLogIn = async() => {
    await nango
    .auth(jiraId, jiraConnection)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
        // Handle failure.
        console.log("Failed to Login")
    });
  }


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
    nango = new Nango({publicKey: publicKey})
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
            {jiraIssues.length !==0 ?
              <div>
                {jiraIssues.map(issue =>(<JiraIssueContent key={issue._id}
                 _id={issue._id} 
                 _key={issue._key} 
                 _url={issue._url} 
                 _summary={issue._summary} 
                 _status={issue._status} 
                 _projectName={issue._projectName} />
                 ))}
              </div>
              :
           <div className='loading'>LOADING DATA.....</div>
            }
          </div> : null}
          {active === 2 ? <div className="projects-content">
           {jiraProjects.length !== 0 ? 
           <div>
            {jiraProjects.map(project => ( 
            <JiraProjectContent key={project._id} 
            _id={project._id} 
            _key={project._key} 
            _name={project._name} 
            _last_modified={project._last_modified} 
            _number_of_issues={project._number_of_issues} 
            _url={project._url}/>
            ))}
           </div>
            : 
           <div className='loading'> Loading Data.....</div>
           }
          </div> : null}
        </div>  
       </div>
  )
}

export default JiraContent