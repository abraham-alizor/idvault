import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

import { ProtectedRoutes } from "@/utils/functions/ProtectedRoutes";

SplashScreen.preventAutoHideAsync();

export default function ConsentLayout() {
  return (
    <ProtectedRoutes>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="view-details"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ProtectedRoutes>
  );
}
