import supabase from "../supabaseClient.js";

export const getProjects = async (req, res) => {
    const { data, error } = await supabase.from('Projects').select();

    if (error) {
        throw error;
    }
    
    res.status(200).json(data);
}