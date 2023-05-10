import supabase from "../supabaseClient.js";

export const getClients = async (req, res) => {
    try {
        const { data, error } = await supabase.from('clients').select();
    
        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}

export const updateClient = async (req, res) => {
    const { body, params } = req;

    try {
        const { error } = await supabase.from('clients').update(body).eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Client with id: ${params.id} has been modified`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating your entry' });
    }
}

export const deleteClient = async (req, res) => {
    const { params } = req;
    
    try {
        const { error } = await supabase.from('clients').delete().eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Client with id: ${params.id} has been deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting your entry' });
    }
}

export const postClient = async (req, res) => {
    const { body } = req;
    try {
        const { error } = await supabase.from('clients').insert(body);

        if (error) {
          throw error;
        }
        res.status(200).send(`Client added successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding your data' });
    }
}