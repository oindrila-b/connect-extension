import React from 'react'
import './GithubContent.css'
import { ContentItem } from '../asset/ContentItem'

const GithubContent = () => {
  return (
    <nav className='options'>
      <ul className='option-items'>
        <li>
          <div className='item'>Repositories</div>

          <ContentItem name='helo' url='lol' />

        </li>
        <li>
          <div className='item'>Starred Repositories</div>

          <ContentItem name='helo' url='lol' owner='shola' />

        </li>
      </ul>
    </nav>
  )
}

export default GithubContent