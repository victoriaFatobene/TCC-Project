// Arquivo: mobile/src/services/supabase.js
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
 
// A URL correta da API
const supabaseUrl = 'https://bgtpylgpsthgytnlrkwd.supabase.co';
 
// A sua chave anon pública
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJndHB5bGdwc3RoZ3l0bmxya3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDgzNTYsImV4cCI6MjA3MjkyNDM1Nn0.n90_SfS2aX7tvCjvwTKBezY869KnOoupNN2GQZWY6jw';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);