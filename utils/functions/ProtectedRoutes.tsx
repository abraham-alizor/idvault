import { useSession } from "@/context/ContextProvider";
import { Redirect } from "expo-router";
import React from "react";
import { Text } from "react-native";

export const ProtectedRoutes = ({ children }: any) => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/welcome" />;
  }

  return children;
};
