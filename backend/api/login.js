import supabase from "../supabaseClient.js";

export const getUser = async (req, res) => {
    const { body, params } = req;

    try {
        const { data, error } = await supabase.from('users').select().eq('name', params.name);
    
        if (error) {
          throw error;
        }
        res.status(200).json('welcome');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}