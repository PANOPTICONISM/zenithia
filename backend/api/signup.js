import supabase from "../supabaseClient.js";

export const signUp = async (req, res) => {
    const { body } = req;

    const { data, error } = await supabase.auth.signUp({
        email: body.username,
        password: body.password,
    })

    if (error) {
        return res.status(error.status).json(error)
    }

    if (data) {
        return res.status(200).json(data);
    }
}