import React, { useEffect, useState } from 'react'
import { GithubRepo } from '../asset/models/GithubRepoModel'
import { addData, getStoreData, Stores } from '../../../initDB'
import { GithubContentItem } from '../asset/github-content/GithubContentItem'

const GithubTabContent = (repos : {repository: GithubRepo[], storage: Stores}) => {

  const [active, setActive] =  useState(1)
  const [res, setRes] = useState<any[]>([])

  const fetchDBData = async() => {
    const data = await getStoreData(repos.storage);
    console.log(JSON.stringify(data))
    setRes(data)
  }
 

  const handleActive = (index: number) => {
    if(index === 1) {
      fetchDBData()
    }
    setActive(index)
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
          <div> 
            {
              res.map((repo) => {
                console.log(repo.name)
                return <GithubContentItem key={repo.id} _id={repo.is} _name={repo.name} _url={repo.url} />
              })
            }
          </div>: null
        }
        {active === 2 ?
        <>
        {repos.repository.length !== 0 ? 
            <div>
              {repos.repository.map(repo => {
                const id = repo._id;
                const name = repo._name;
                const url = repo._url;
                addData(repos.storage, {name, url, id})
              return <GithubContentItem key={repo._id} _name={repo._name} _url={repo._url} _id={repo._id} />
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

export default GithubTabContent