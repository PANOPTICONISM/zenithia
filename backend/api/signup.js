import supabase from "../supabaseClient.js";

export const signUp = async (req, res) => {
    const { params } = req;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: params.username,
            password: params.password,
          })
              
        if (error) {
            res.status(401).json('401');
        }
        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
}