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

import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    seconds: 1
  };

  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.myTime = Date().toLocaleLowerCase()
    }, 1000);

    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
    
  }

  // eslint-disable-next-line react/no-typos
  componentWillUnMount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        {/*<h1>Number of seconds is {this.state.seconds}</h1>*/}
        <div class="square">
          <div class="timeZone">{this.myTime}</div>          
        </div>
      </div>
    );
  }
}

export default App;
