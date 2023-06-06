import supabase from "../supabaseClient.js";

export const processUserDetails = async (req, res) => {
    const { body } = req;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: body.username,
        password: body.password,
    })

    if (error) {
      return res.status(error.status).json(error.message)
    }

    if (data) {
      return res.status(200).json(data.user);
    }
}