import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects/Projects';
import React from 'react';
import { SearchBarProvider } from './contexts/SearchBarProvider';
import { SidebarProvider } from './contexts/SidebarProvider';
import Tasks from './pages/Tasks';

export const white = '#fff';
export const darkBlue = '#191E38';
export const lightBlue = '#F7F8FF';
export const highlight = '#1F2C4F';
export const grey = '#DBDBDB';

function App() {
  return (
    <SidebarProvider>
      <SearchBarProvider>
        <Routes>
          <Route path="/" element={ <Dashboard/> } />
          <Route path="calendar" element={<Projects/> } />
          <Route path="tasks" element={<Tasks/> } />
          <Route path="projects" element={<Projects/> } />
          <Route path="clients" element={<Projects/> } />
          <Route path="hours" element={<Projects/> } />
          <Route path="revenue" element={<Projects/> } />
        </Routes>
      </SearchBarProvider>
    </SidebarProvider>
  );
}

export default App;