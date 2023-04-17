import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects/Projects';
import React from 'react';
import { SearchBarProvider } from './contexts/SearchBarProvider';
import { SidebarProvider } from './contexts/SidebarProvider';

export const white = '#fff';
export const darkBlue = '#191E38';
export const lightBlue = '#F7F8FF';
export const highlight = '#1F2C4F';

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