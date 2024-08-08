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
import { ToastProvider } from "react-native-toast-notifications";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

import { SessionProvider, useSession } from "@/context/ContextProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ToastProvider>
        <SessionProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(app)" />
            <Stack.Screen
              name="welcome"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="verify-photo"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="photo-capture"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SessionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
