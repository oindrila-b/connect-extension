import React, { useState } from 'react'
import { JiraIssueModel } from '../asset/models/JiraIssueModel';
import { Stores, addData, getStoreData } from '../../../initDB';
import { JiraIssueContent } from '../asset/jira-content/JiraIssueContent';
import { JiraProjectModel } from '../asset/models/JiraProjectModel';
import { JiraProjectContent } from '../asset/jira-content/JiraProjectContent';

const JiraProjectTab = (project: { project: JiraProjectModel[], storage: Stores }) => {

    const [active, setActive] = useState(2)
    const [res, setRes] = useState<any[]>([])


    const fetchDBData = async () => {
        const data = await getStoreData(project.storage);
        console.log(JSON.stringify(data))
        setRes(data)
    }

    const handleActive = (index: number) => {
        if (index === 1) {
            fetchDBData()
        }
        setActive(index)
    }



    return (
        <div>
            <div className="container">
                <div className="bloc-tabs">
                    <button className={active === 1 ? 'j-entity db' : 'j-entity'} onClick={() => handleActive(1)}>DB</button>
                    <button className={active === 2 ? 'j-entity api' : 'j-entity'} onClick={() => handleActive(2)}>API</button>
                </div>
                <div className="tab-content">
                    {active === 1 ?
                        <div>
                             {res.map(repo => {
                                        return <JiraProjectContent
                                        key={repo.id}
                                         _id={repo.id} 
                                         _key={repo.key} 
                                         _name={repo.name} 
                                         _last_modified={repo.lastModified} 
                                         _number_of_issues={repo.numberOfIssues} 
                                         _url={repo.url}                              
                                      />
                                    })}
                        </div> : null
                    }
                    {active === 2 ?
                        <>
                            {project.project.length !== 0 ?
                                <div>
                                    {project.project.map(repo => {
                                        const id = repo._id;
                                        const key = repo._key;
                                        const url = repo._url;
                                        const name = repo._name;
                                        const lastModified = repo._last_modified;
                                        const numberOfIssues = repo._number_of_issues;

                                         addData(project.storage, { id, key, url, name, lastModified, numberOfIssues })
                                        return <JiraProjectContent
                                        key={repo._id}
                                         _id={repo._id} 
                                         _key={repo._key} 
                                         _name={repo._name} 
                                         _last_modified={repo._last_modified} 
                                         _number_of_issues={repo._number_of_issues} 
                                         _url={repo._url}                              
                                      />
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

export default JiraProjectTab