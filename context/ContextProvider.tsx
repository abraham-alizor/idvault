import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { createContext, useContext, PropsWithChildren } from "react";
import { useRouter } from "expo-router";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  setDataState: (data: any) => void;
  session?: string | null;
  isLoading: boolean;
  data: any | null;
}>({
  signIn: () => null,
  signOut: () => null,
  setDataState: () => null,
  session: null,
  isLoading: false,
  data: null,
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
  const [[loading, data], setData] = useStorageState("data");
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
        setDataState: (data: string | null) => {
          return setData(data);
        },
        data,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
