import React from 'react';
import Header from './components/Header'
import './styles.css'
import api from './services/api'
import Main from './pages/main'
import Routes from './routes'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
