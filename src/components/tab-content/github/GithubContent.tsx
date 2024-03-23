import React, { useEffect, useState } from 'react'
import './GithubContent.css'
import { GithubContentItem } from '../asset/GithubContentItem'
import { GithubRepo } from '../GithubRepoModel'

const GithubContent = () => {

  const baseURL = 'http://127.0.0.1:5000/list/github'

  const [githubRepositories, setGithubRepositories] = useState<GithubRepo[]>([])
  const [githubStarred, setGithubStarred] = useState<GithubRepo[]>([])

  const [active, setActive] =  useState(1)

  const fetchRepoData = async() => {
    const response = await fetch(`${baseURL}/repository`)
    const data = await response.json()
    console.log(data)
    setGithubRepositories(data)
  }

  const fetchStarredRepoData = async() => {
    const response = await fetch(`${baseURL}/starred`)
    const data = await response.json()
    console.log(data)
    setGithubStarred(data)
  }

  useEffect(() => {
    fetchRepoData()
    fetchStarredRepoData()
  },[])

const handleActive = (index: number) => {
  setActive(index)
}

  return (
   
       <div className='container'>
       <div className="bloc-tabs">
          <button className={active  === 1 ? 'g-entity repo' : 'g-entity'} onClick={() => handleActive(1)}>Repositories</button>
          <button className={active  === 2 ? 'g-entity starred' : 'g-entity'} onClick={() => handleActive(2)}>Starred Repositories</button>
        </div>
        <div className="entity-content">
        {active === 1 ? <div className="repo-content">
            {githubRepositories.length !== 0 ? 
            <div>
              {githubRepositories.map(repo => (<GithubContentItem key={repo._id} name={repo._name} url={repo._url} />))}
            </div>
            : 
            <div className='loading'>LOADING DATA.....</div>
            }
          </div> : null}
          {active === 2 ? <div className="starred-content">
            {githubStarred.length !== 0 ? 
            <div>
              {githubStarred.map(repo => (<GithubContentItem key={repo._id} name={repo._name} url={repo._url} owner={repo._owner} />))}
            </div>
            : 
            <div className='loading'>LOADING DATA.....</div>}
          </div> : null}
        </div>  
       </div>
  )
}

export default GithubContent