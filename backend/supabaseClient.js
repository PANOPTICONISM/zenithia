import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eaudflpgzewtokpbpvqi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdWRmbHBnemV3dG9rcGJwdnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExMjk3NjIsImV4cCI6MTk5NjcwNTc2Mn0.nQICGmh_K6BYPMt-OTyltG1PZJmt_6LgabLnxB6Iml4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;