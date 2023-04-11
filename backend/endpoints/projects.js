import supabase from "../supabaseClient.js";

export const getProjects = async (req, res) => {
    const { data, error } = await supabase.from('Projects').select();

    if (error) {
        throw error;
    }
    
    res.status(200).json(data);
}

export const updateProjects = async (req, res) => {
    const { body, params } = req;
    
    const {error} = await supabase.from('Projects').update(body).eq('id', params.id);
    
    if (error) {
        throw error;
    }

    res.status(200).send(`User modified with id: ${params.id}`)
}