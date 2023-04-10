import axios from 'axios';
import React from 'react';

const Projects = () => {
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    axios.get('/projects')
      .then((res) => setData(res.data));
  }, []);

  console.log(data);

  return (
    <div>Projects</div>
  );
};

export default Projects;