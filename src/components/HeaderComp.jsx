// Header component
// H1 element to show the site Title: Movie Review
// Unorder list HOME and

import React from 'react'
import './../App.css'
import './HeaderComp.css'

const TagList = (props) => {
  return (
    <div className='SetHeader'>
      <h1 className='MainHeader'>Movie Review</h1>
      <div className='ContainTags'>
        {props.tags.map((tag, index) =>
          <span className='HeadTags' key={`tag-${index}`}>
            { console.log('props.selectedTag is:', props.selectedTag) }
            { console.log('tag is:', tag) }
            <a
              name={tag}
              onClick={props.onTagClick}
              className={props.selectedTag === tag ? 'App-link-selected' : 'App-link'}
              href='#'
            >
              {tag}
            </a>
            {index === props.tags.length - 1 ? '' : ' | '}
          </span>
        )}
      </div>
    </div>
  )
}

export default TagList
