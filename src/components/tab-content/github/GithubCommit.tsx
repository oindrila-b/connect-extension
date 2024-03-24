import React, { useState } from 'react'
import { GithubCommitModel } from '../asset/models/GithubCommitModel';
import GithubCommitItem from '../asset/github-content/GithubCommitItem';

const GithubCommit = () => {

    const COMMIT_ENDPOINT_URL = `http://localhost:5000/commits/`;

    const [repositoryName, setRepositoryName] = useState("")
    const [commitData, setCommitData] = useState<GithubCommitModel[]>([])
    const [errorMessage, setErrorMessage] = useState("ENTER VALID REPOSTORY NAME")

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
            <div className='c-repo-name'>
                <input type="text" size={30} placeholder='Enter repository name' onChange={(event) => { handleInput(event) }} />
                <button className='commit-buttton' type='button' onClick={handleSubmit}> Get Commits</button>
            </div>
            <div>
                {commitData.length !== 0 ?
                    <>
                    {
                        commitData.map(commit => {
                            return <GithubCommitItem _id={commit._id} _message={commit._message} _committer={commit._committer} _commitURL={commit._commitURL}/>;
                        })
                    }
                    
                    </>
                    :
                    <div className='content'>
                    {errorMessage}
                    </div>}
            </div>
        </div>
    )
}

export default GithubCommit