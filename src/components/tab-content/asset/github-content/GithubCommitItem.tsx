import React from 'react'
import { GithubCommitModel } from '../models/GithubCommitModel'

const GithubCommitItem = (props: GithubCommitModel) => {
  return (
    <div className='content'>
        <a href={props._commitURL}>
                    <span>Commit Message- {props._message}</span>
                    <br />
                    <span>Committed By - {props._committer}</span>
                </a>
    </div>
  )
}

export default GithubCommitItem