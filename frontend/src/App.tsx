import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects/Projects';
import React from 'react';
import { SearchBarProvider } from './contexts/SearchBarProvider';
import { SidebarProvider } from './contexts/SidebarProvider';
import Tasks from './pages/Tasks';
import { TimeTracker } from './pages/TimeTracker/TimeTracker';

export const white = '#fff';
export const darkBlue = '#191E38';
export const lightBlue = '#F7F8FF';
export const highlight = '#1F2C4F';
export const grey = '#DBDBDB';
export const green = '#007D58';
export const yellow = '#ECB800';
export const red = '#E42C2C';

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
          <Route path="timetracker" element={<TimeTracker/> } />
          <Route path="revenue" element={<Projects/> } />
        </Routes>
      </SearchBarProvider>
    </SidebarProvider>
  );
}

export default App;