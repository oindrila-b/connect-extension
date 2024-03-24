import React, { useState } from 'react'
import { JiraIssueModel } from '../asset/models/JiraIssueModel';
import { Stores, addData, getStoreData } from '../../../initDB';
import { JiraIssueContent } from '../asset/jira-content/JiraIssueContent';

const JiraIssueTab = (issue: { issue: JiraIssueModel[], storage: Stores }) => {

    const [active, setActive] = useState(0)
    const [res, setRes] = useState<any[]>([])

    const fetchDBData = async () => {
        const data = await getStoreData(issue.storage);
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
                            {
                                res.map((repo) => {
                                    console.log(repo.id)
                                    return <JiraIssueContent 
                                    key={repo.id} 
                                    _id={repo.id} 
                                    _key={repo.key} 
                                    _url={repo.url} 
                                    _summary={repo.summary} 
                                    _status={repo.status} 
                                    _projectName={repo.projectName} />
                                })
                            }
                        </div> : null
                    }
                    {active === 2 ?
                        <>
                            {issue.issue.length !== 0 ?
                                <div>
                                    {issue.issue.map(repo => {
                                        const id = repo._id;
                                        const key = repo._key;
                                        const url = repo._url;
                                        const summary = repo._summary;
                                        const status = repo._status;
                                        const projectName = repo._projectName;

                                        addData(issue.storage, { id, key, url, summary, status, projectName })
                                        return <JiraIssueContent key={repo._id}
                                            _id={repo._id}
                                            _key={repo._key}
                                            _url={repo._url}
                                            _summary={repo._summary}
                                            _status={repo._status}
                                            _projectName={repo._projectName} />
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

export default JiraIssueTab