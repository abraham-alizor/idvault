import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

import { SessionProvider, useSession } from "@/context/ContextProvider";
import { Text } from "react-native";
import { ProtectedRoutes } from "@/utils/functions/ProtectedRoutes";

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  return (
    <ProtectedRoutes>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ProtectedRoutes>
  );
}
