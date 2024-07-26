import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { createContext, useContext, PropsWithChildren } from "react";
import { useRouter } from "expo-router";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const router = useRouter();
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setSession("xxx");
          router.push("/(tabs)");
        },
        signOut: () => {
          setSession(null);
          router.push("/welcome");
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
