import supabase from "../supabaseClient.js";

export const signUp = async (req, res) => {
    const { body } = req;

    console.log(body, 'wack')

    await supabase.auth.signUp({
        email: body.username,
        password: body.password,
    }).then((data) => res.status(200).json(data)).catch((error) => res.status(error.status).json(error.message))
}