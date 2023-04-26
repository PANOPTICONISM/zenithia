import React from 'react';
import Main from '../../components/Main/Main';

export const TimeTracker = () => {
  const addTracking = () => {
    console.log('add');
  };
  
  return (
    <Main title="TimeTracker" handleClick={addTracking} buttonText='Add hours'>Hello</Main>
  );
};
