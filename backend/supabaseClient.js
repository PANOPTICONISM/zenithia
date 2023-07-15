import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (options) => createClient(supabaseUrl, supabaseKey, options);

export default supabase;