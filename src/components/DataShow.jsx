import React, { Component } from "react";


class DataShow extends Component {
  constructor (props) {
    super(props)
    this.state = { seconds: 1
                  }
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
          <div className='App'> 
            <div className='square'>
              <div className='timeZone'> {this.myTime} </div>
            </div>
          </div>
        </div>        
      </div>
    )
  }
}

export default DataShow
