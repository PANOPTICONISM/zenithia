import supabase from "../supabaseCalendar.js";

export const getCalendar = async (req, res) => {
    try {
        const { data, error } = await supabase.from('calendar').select();
    
        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}

export const updateCalendar = async (req, res) => {
    const { body, params } = req;

    try {
        const { error } = await supabase.from('calendar').update(body).eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Calendar with id: ${params.id} has been modified`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating your entry' });
    }
}

export const deleteCalendar = async (req, res) => {
    const { params } = req;
    
    try {
        const { error } = await supabase.from('calendar').delete().eq('id', params.id);
    
        if (error) {
          throw error;
        }
        res.status(200).send(`Calendar with id: ${params.id} has been deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting your entry' });
    }
}

export const postCalendar = async (req, res) => {
    const { body } = req;
    try {
        const { error } = await supabase.from('calendar').insert(body);

        if (error) {
          throw error;
        }
        res.status(200).send(`Calendar added successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding your data' });
    }
}