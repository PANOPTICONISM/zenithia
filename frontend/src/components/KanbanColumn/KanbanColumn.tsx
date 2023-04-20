import { Typography } from '@mui/material';
import React from 'react';

const Task = ({ task } : {task: {id: string, content: string}}) => {

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      {task.content}
    </div>
  );
};

const Column = ({ column, tasks } : {column: {title: string}, tasks: {id: string, content: string}[]}) => {

  return (
    <div>
      <Typography>{column.title}</Typography>
      <div>{tasks.map((task) => <Task task={task} key={task.id} />)}</div>
    </div>
  );
};

export default Column;