import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/context/ContextProvider";
import { Image } from "react-native";
import {
  bank_active,
  bank_tab,
  home,
  home_active,
  settings_active_tab,
  settings_tab,
} from "@/assets/images";
import { ThemedView } from "@/components/ThemedView";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <ThemedView
                className={`${
                  focused ? "bg-[#E0FFE8]" : ""
                }  flex justify-center items-center rounded-2xl px-4 py-1 my-2`}
              >
                <Image
                  source={focused ? home_active : home}
                  className="h-6 w-6"
                />
              </ThemedView>
            ),
          }}
        />
        <Tabs.Screen
          name="consents"
          options={{
            title: "Consents",
            tabBarIcon: ({ color, focused }) => (
              <ThemedView
                className={`${
                  focused ? "bg-[#E0FFE8]" : ""
                }  flex justify-center items-center rounded-2xl px-4 py-1 my-2`}
              >
                <Image
                  source={focused ? bank_active : bank_tab}
                  className="h-6 w-6"
                />
              </ThemedView>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <ThemedView
                className={`${
                  focused ? "bg-[#E0FFE8]" : ""
                }  flex justify-center items-center rounded-2xl px-4 py-1 my-2`}
              >
                <Image
                  source={focused ? settings_active_tab : settings_tab}
                  className="h-6 w-6"
                />
              </ThemedView>
            ),
          }}
        />
      </Tabs>
    </SessionProvider>
  );
}
