import React, { Component } from "react";

function formatDate(date) {
  let hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "  " + strTime;
}

class DataShow extends Component {
  constructor (props) {
    super(props)
    this.state = { seconds: 1
                  }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      let myTime = new Date();
      let myFormatTime = formatDate(myTime);
      this.myTime = myFormatTime;
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
