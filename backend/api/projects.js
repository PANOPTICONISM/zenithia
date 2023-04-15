import supabase from "../supabaseClient.js";

const whitelist = [
    '*'
  ];

export const getProjects = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  if (!req.method === 'OPTIONS') next();
    try {
        const { data, error } = await supabase.from('projects').select();
    
        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}

export const updateProjects = async (req, res) => {
    const { body, params } = req;

    try {
        const { error } = await supabase.from('projects').update(body).eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Project with id: ${params.id} has been modified`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating your entry' });
    }
}

export const deleteProject = async (req, res) => {
    const { params } = req;
    
    try {
        const { error } = await supabase.from('projects').delete().eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Project with id: ${params.id} has been deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting your entry' });
    }
}

export const postProject = async (req, res) => {
    const { body } = req;
    try {
        const { error } = await supabase.from('projects').insert(body);

        if (error) {
          throw error;
        }
        res.status(200).send(`Project added successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding your data' });
    }
}