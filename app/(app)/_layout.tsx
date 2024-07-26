import { useSession } from "@/context/ContextProvider";
import { ProtectedRoutes } from "@/utils/functions/ProtectedRoutes";
import { Redirect, Slot, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  return (
    <ProtectedRoutes>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(consent)" />
      </Stack>
    </ProtectedRoutes>
  );
}
