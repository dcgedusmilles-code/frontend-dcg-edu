import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null)


  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session);

      if (session) {
        const { data: userData } = await supabase
          .from("usuarios")
          .select("id, email,perfis(nome)")
          .eq("auth_id", session.user.id)
          .single();

        setUsuario(userData)
        setRole(userData?.perfis?.nome || null);
      }

      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setRole(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      return { success: false, error: error.message };
    }

    setSession(data.session);

    if (data.user) {
      const { data: userData } = await supabase
        .from("usuarios")
        .select("perfis(nome)")
        .eq("auth_id", data.user.id)
        .single();

      setRole(userData?.perfis?.nome || null);
    }

    return { success: true, data };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setSession(null);
    setRole(null);

    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        usuario,
        signInUser,
        signOut,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ nome padrão de hook
export const UserAuth = () => useContext(AuthContext);
