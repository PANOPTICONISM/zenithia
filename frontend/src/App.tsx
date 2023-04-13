import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects/Projects';
import React from 'react';
import { SearchBarProvider } from './contexts/SearchBarProvider';

function App() {
  return (
    <div className="App">
      <SearchBarProvider>
        <Routes>
          <Route path="/" element={ <Dashboard/> } />
          <Route path="projects" element={<Projects/> } />
        </Routes>
      </SearchBarProvider>
    </div>
  );
}

export default App;