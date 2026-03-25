import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cxikmjjopgdkusaalzxz.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4aWttampvcGdka3VzYWFsenh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTU1NjksImV4cCI6MjA4ODEzMTU2OX0.gbTNl-I2pjc0Yn5pOJ8RVmbY96ZrJX0sth6K8OdlHVM";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
