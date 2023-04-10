import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eaudflpgzewtokpbpvqi.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

// in each js file we need the connection we need to import this file by the code below:
//const supabase = require("./supabaseClient");
