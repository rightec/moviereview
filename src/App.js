//import React from 'react';
//import logo from './images/logoRightec.png';
//import { ReactComponent as Logo } from './logo.svg';
//import './App.css';





/*
function App() { 
  return (
    <div class="square">
      <div class="timeZone">{retData()}</div>
      <h1>Number of seconds is {this.state.seconds}</h1>
    </div>  
  );
}
*/

import React from 'react'
import TagList from './components/HeaderComp'
import './App.css'
import Carousel from './components/Carousel'
// import './Carousel.css'

const tags = ['HOME', 'REVIEW']
let selectedTag= tags[0]


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { seconds: 1
                  }
    // props.tags = ['HOME', 'REVIEW']
    // props.selectedTags = props.storedTags[0]
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.myTime = Date().toLocaleLowerCase()
    }, 1000)

    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 })
    }, 1000)
  }

  // eslint-disable-next-line react/no-typos
  componentWillUnMount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <div>
        <div className='Header'>
          <div className='App'> {/* <h1>Number of seconds is {this.state.seconds}</h1> */}
            <div className='square'>
              <div className='timeZone'> {this.myTime} </div>
            </div>
          </div>
          <TagList
            tags={tags}
            selectedTag={selectedTag}
            onTagClick={(e)=> {
              console.log(e.target.name)
              selectedTag = e.target.name
            }
          }
          />
        </div>
        
        {/* console.log('selectedTag is: ',selectedTag) */}
        {selectedTag === tags[0] ? <Carousel /> : null}
      </div>
    )
  }
}

export default App
