import supabase from "../supabaseClient.js";

export const getTasksColumns = async (req, res) => {
    try {
        const { data, error } = await supabase.from('columns').select();
    
        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}

export const getTasks = async (req, res) => {
    try {
        const { data, error } = await supabase.from('tasks').select(`
        *,
        projects("*")
    `);
    
        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}

export const postTask = async (req, res) => {
    const { body } = req;
    try {
        const { error } = await supabase.from('tasks').insert(body);

        if (error) {
          throw error;
        }
        res.status(200).send(`Task added successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding your data' });
    }
}

export const updateTask = async (req, res) => {
    const { body, params } = req;

    try {
        const { error } = await supabase.from('tasks').update(body).eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Task with id: ${params.id} has been modified`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating your entry' });
    }
}

export const deleteTask = async (req, res) => {
    const { params } = req;
    
    try {
        const { error } = await supabase.from('tasks').delete().eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Task with id: ${params.id} has been deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting your entry' });
    }
}