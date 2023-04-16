import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects/Projects';
import React from 'react';
import { SearchBarProvider } from './contexts/SearchBarProvider';
import { SidebarProvider } from './contexts/SidebarProvider';

function App() {
  return (
    <div className="App">
      <SidebarProvider>
        <SearchBarProvider>
          <Routes>
            <Route path="/" element={ <Dashboard/> } />
            <Route path="projects" element={<Projects/> } />
          </Routes>
        </SearchBarProvider>
      </SidebarProvider>
    </div>
  );
}

export default App;