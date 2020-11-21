// Search Engine component
// Input text element to enter the text to search
// ...

import React from 'react'
import './SearchEngine.css'

const SearchEngine = (props) => {
  return (
    <div className='SearchEngine'>
        <h2>SEARCH BOX</h2>
        <input className='SearchBox' type="text" id="fname" name="fname" />
    </div>
  )
}

export default SearchEngine
