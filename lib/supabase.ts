
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ubmjgpmfrfkrhmnykqzj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVibWpncG1mcmZrcmhtbnlrcXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTQxMzEsImV4cCI6MjA4NzM3MDEzMX0.u6EIz2rtLPnhzG86sSOnN6QVMYusVZ_IfNw7Ww91czU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
