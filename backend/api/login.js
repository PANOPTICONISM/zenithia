import supabase from "../supabaseClient.js";

export const processUserDetails = async (req, res) => {
    const { params } = req;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: params.username,
            password: params.password,
          })

        if (error) {
          throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching your data' });
    }
}