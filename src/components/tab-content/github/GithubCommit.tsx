import React, { useState } from 'react'
import { GithubCommitModel } from '../asset/models/GithubCommitModel';
import GithubCommitItem from '../asset/github-content/GithubCommitItem';
import { Stores, addDataToCommitDB, deleteAllDataFromStore, getStoreData } from '../../../initDB';

const GithubCommit = () => {

    const COMMIT_ENDPOINT_URL = `https://external-access-server.onrender.com/commits/`;

    const [repositoryName, setRepositoryName] = useState("")
    const [commitData, setCommitData] = useState<GithubCommitModel[]>([])
    const [dbCommitData, setDBCommitData] = useState<any[]>([])
    const [errorMessage, setErrorMessage] = useState("ENTER VALID REPOSTORY NAME")
    const [active, setActive] =  useState(2)

    const handleInput = (event: any) => {
        setRepositoryName(event.target.value)
        console.log(event.target.value)
    }

    const handleSubmit = async () => {
        console.log(repositoryName)
        if(repositoryName === "" ){
            alert("Please enter repository name")
        }
         await fetchCommits(repositoryName) 
         // fetch from database and store 
         deleteAllDataFromStore(Stores.Commit)
        
    }

    const handleActive = (index: number) => {
        if(index === 1) {
          fetchDBData()
        }
        setActive(index)
      }

      const fetchDBData = async() => {
        const data = await getStoreData(Stores.Commit);
        console.log(JSON.stringify(data))
        setDBCommitData(data)
      }

    const fetchCommits = async (repositoryName: string) => {
        const data = await fetch(`${COMMIT_ENDPOINT_URL}${repositoryName}`);
        const res = await data.json();
        if(typeof res === "string") {
            setCommitData([])
            setErrorMessage(res)
            alert(res)
        }else{
            console.log(res)
            setCommitData(res);
        }
    
    }


    return (
        <div className='container'>
            <div className="bloc-tabs">
          <button className={active  === 1 ? 'g-entity repo' : 'g-entity'} onClick={() => handleActive(1)}>DB</button>
          <button className={active  === 2 ? 'g-entity starred' : 'g-entity'} onClick={() => handleActive(2)}>API</button>
        </div>
        <div className="tab-content">
        {active === 1 ? 
          <div> 
            {
              dbCommitData.length > 0 ? <>
              {
                dbCommitData.map((repo) => {
                    console.log(repo.name)
                    return <GithubCommitItem key={repo.id} _id={repo.id} _message={repo.message} _committer={repo.committer} _commitURL={repo.commitURL} />
                  })
              }
              </>
              :
              null
            }
          </div>:
           null
        }
        {
           active === 2 ? 
           <>
           <div className='c-repo-name'>
               <input type="text" size={30} placeholder='Enter repository name' onChange={(event) => { handleInput(event) }} />
               <button className='commit-buttton' type='button' onClick={handleSubmit}> Get Commits</button>
           </div>
           <div>
               {commitData.length !== 0 ?
                   <>
                   {
                       commitData.map(commit => {
                           const repoName = repositoryName;
                           const id = commit._id;
                           const message = commit._message;
                           const committer = commit._committer;
                           const commitURL = commit._commitURL;

                           addDataToCommitDB( {repoName, id, message, committer, commitURL})

                           return <GithubCommitItem _id={commit._id} _message={commit._message} _committer={commit._committer} _commitURL={commit._commitURL}/>;
                       })
                   }
                   
                   </>
                   :
                   <div className='content'>
                   {errorMessage}
                   </div>}
           </div>
           </>
           :
           null
        }
        </div>
        </div>
    )
}

export default GithubCommit