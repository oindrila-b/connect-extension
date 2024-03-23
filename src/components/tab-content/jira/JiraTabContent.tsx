import React, { useEffect, useState } from 'react'
import { addData, Stores } from '../../db/initDB'
import { JiraIssueModel } from '../asset/models/JiraIssueModel'
import { JiraProjectModel } from '../asset/models/JiraProjectModel'
import { JiraIssueContent } from '../asset/jira-content/JiraIssueContent'

const JiraTabContent = (repos : {model: JiraIssueModel[]| JiraProjectModel[], storage: Stores}, storage: {storage: Stores}) => {

  const [active, setActive] =  useState(1)
  const [isJiraIssue, setIsJiraIssue] = useState(false)
 
  const handleActive = (index: number) => {
    setActive(index)
    if(instanceOfJiraIssueModel(repos.model)) {
    setIsJiraIssue(true)
  }
 
  function instanceOfJiraIssueModel(object: any): object is JiraIssueModel {
    return 'member' in object;
}


  return (
    <div>
        <div className="container">
        <div className="bloc-tabs">
          <button className={active  === 1 ? 'g-entity repo' : 'g-entity'} onClick={() => handleActive(1)}>DB</button>
          <button className={active  === 2 ? 'g-entity starred' : 'g-entity'} onClick={() => handleActive(2)}>API</button>
        </div>
        <div className="tab-content">
          {active === 1 ? 
          <div> DATABASE</div>: null
        }
        {active === 2 ?
        <>
        {repos.model.length !== 0 ? 
            <div>
              {repos.model.map(repo => {
                const id = repo._id;
                const name = repo._name;
                const url = repo._url;
                addData(storage.storage, {name, url, id})
              return <JiraIssueContent _key={repo._id} _name={repo._name} _url={repo._url} _id={repo._id} />
              })}
            </div>
            : 
            <div className='loading'>LOADING DATA.....</div>
            }
        </> : null
      }
        </div>
        </div>
    </div>
  )
}
}
export default JiraTabContent