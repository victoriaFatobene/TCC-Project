// Arquivo: mobile/src/services/supabase.js
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// ✅ Adiciona o polyfill só no ambiente mobile
if (Platform.OS !== 'web') {
  require('react-native-url-polyfill/auto');
}

// 🔗 Sua URL e chave pública
const supabaseUrl = 'https://bgtpylgpsthgytnlrkwd.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJndHB5bGdwc3RoZ3l0bmxya3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDgzNTYsImV4cCI6MjA3MjkyNDM1Nn0.n90_SfS2aX7tvCjvwTKBezY869KnOoupNN2GQZWY6jw';

// 🧠 Cria o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
