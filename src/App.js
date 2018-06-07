import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import './utils/dbhelper';
import UserList from './models/UserList';

class App extends Component {
    render() {
	return (
	    <div className="App">
	      <UserList />
              <header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
		To get started, edit <code>src/App.js</code> and save to reload.
              </p>
	    </div>
	);
    }
}

export default App;
