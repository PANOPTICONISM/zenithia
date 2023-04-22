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
    const { params } = req;

    try {
        const { data, error } = await supabase.from('tasks').select().eq('column_id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}