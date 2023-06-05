import supabase from "../supabaseClient.js";

export const processUserDetails = async (req, res) => {
    const { body } = req;

    await supabase.auth.signInWithPassword({
        email: body.username,
        password: body.password,
      }).then((data) => res.status(200).json(data)).catch((error) => res.status(error.status).json(error.message))
}