import React from 'react'
import TagList from './components/HeaderComp'
import './App.css'
import Carousel from './components/Carousel'
import SearchEngine from './components/SearchEngine'
import DataShow from './components/DataShow'


const tags = ['HOME', 'REVIEW']
let selectedTag= tags[0]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      useless: tags[0] }
  }

  componentDidMount () {
    // console.log('selectedTag is on Mount: ',this.state.selectedTag)
    console.log('selectedTag is on Mount: ',selectedTag)
  }

  componentDidUpdate () {
   //  console.log('selectedTag is on UPDATE: ',this.state.selectedTag)
    console.log('selectedTag is on UPDATE: ',selectedTag)
  }


  render () {
    return (
      <div>
        <div className='Header'>
          <div className='App'> 
            <div className='square'>
              <DataShow />
            </div>
          </div>
          <TagList
            tags={tags}
            selectedTag={tags[0]}
            onTagClick={(e)=> {
              console.log('clik on TAG', e.target.name)
              selectedTag = e.target.name
              this.setState({ useless : e.target.name })
            }}
          />
        </div>
        {/*this.state.selectedTag === tags[0] ? <Carousel /> : <SearchEngine />*/}
        {this.state.useless === tags[0] ? <Carousel /> : <SearchEngine />}
      </div>
    )
  }
}

export default App
