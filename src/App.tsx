import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes/Routes';
import Test from './components/Test';

function App() {
  return (
    <div className='App'>
      <Routes />
      <header className='App-header'>
        <Test />
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code> src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
