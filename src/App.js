import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer } from './api/api.js';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
class App extends Component {
  constructor(props){
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ 
    //   timestamp  
    // }));
    this.state = {
      timestamp: 'no timestamp yet',
      username:'',
      isLogged:false
    };
    this.setUserName=this.setUserName.bind(this);
  }

  setUserName(username){
    this.setState({username,isLogged:true});
    
  }

  render() {
    return (
      <div className="App">
      
        {this.state.isLogged?<MainPage username={this.state.username}/>:<LoginForm setUserName={this.setUserName}/>}
        
      </div>
    );
  }
}

export default App;
