import React, { useEffect, useState } from 'react'
import './GithubContent.css'
import { GithubRepo } from '../asset/models/GithubRepoModel'
import { Stores, addData } from '../../db/initDB'
import Nango from '@nangohq/frontend'
import GithubTabContent from './GithubTabContent'

const GithubContent = (nango : {nango: Nango}) => {
  

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
            <GithubTabContent repository={githubRepositories} storage={Stores.GithubRepositories}/>
          </div> : null}
          {active === 2 ? <div className="starred-content">
            <GithubTabContent repository={githubStarred} storage={Stores.GithubStarred} />
          </div> : null}
        </div>  
       </div>
  )
}

export default GithubContent