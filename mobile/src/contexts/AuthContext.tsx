import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '../services/supabase'; 
import { Alert } from 'react-native';
import { Session, User } from '@supabase/supabase-js'; 

// 1. Definir os tipos de dados do contexto
type AuthContextData = {
  session: Session | null;
  user: User | undefined;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// 2. Definir o tipo das props do Provedor
type AuthProviderProps = {
  children: ReactNode;
};

// 3. Criar o Contexto
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// 4. Criar o Provedor
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    }).catch(error => {
      console.error("Erro ao pegar sessão:", error.message);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Valor que será compartilhado
  const value: AuthContextData = {
    session,
    user: session?.user,
    loading, 

    // Função de Login (Não muda)
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) Alert.alert("Erro no Login", error.message);
    },

    // --- A MUDANÇA ESTÁ AQUI ---
    // Função de Cadastro (Cria o usuário e desloga em seguida)
    signUp: async (email, password) => {
      
      // Passo 1: Cria o usuário no sistema de Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return Alert.alert("Erro no Cadastro", authError.message);
      }

      if (!authData.user) {
        return Alert.alert("Erro", "Não foi possível criar o usuário.");
      }

      // Passo 2: Salva o usuário na sua tabela 'public.users'
      // (Já corrigimos os erros de 'name' e 'updated_at' no Supabase)
      const { error: publicError } = await supabase
        .from('users') 
        .insert({ 
          id: authData.user.id, 
          email: authData.user.email,
        });

      if (publicError) {
        console.error("Erro ao salvar em public.users:", publicError.message);
      }

      // --- A LINHA MÁGICA! ---
      // Imediatamente desloga o usuário para destruir a sessão
      // e impedir o login automático.
      await supabase.auth.signOut();
      
      // Mensagem de sucesso atualizada!
      Alert.alert('Cadastro Concluído!', 'Por favor, faça o login.');
    },

    // Função de Logout (Não muda)
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) Alert.alert("Erro no Logout", error.message);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 5. Criar o Hook (Não muda)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};