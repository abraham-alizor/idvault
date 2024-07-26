import React from "react";
import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PagerView from "react-native-pager-view";
import {
  nav_1,
  nav_2,
  nav_3,
  welcome_1,
  welcome_2,
  welcome_3,
} from "@/assets/images";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
export default function WelcomeScreen() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/login");
  };
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        <ThemedView key="1">
          <Image
            source={welcome_1}
            style={{
              height: 300,
              width: 280,
              objectFit: "contain",
              marginTop: "20%",
              marginHorizontal: "auto",
            }}
            // className="object-fill w-60 h-60"
          />
          <ThemedView style={{ paddingHorizontal: 20 }} className="px-10">
            <ThemedText
              type="title"
              style={{ textAlign: "center" }}
              className="text-center"
            >
              Welcome to NINAuth
            </ThemedText>
            {/* <HelloWave /> */}
            <ThemedText type="default" className="text-center">
              Ensure your privacy, manage and control access to your NIN data
            </ThemedText>

            <Image
              source={nav_1}
              className="mx-auto h-5 w-16 rounded-md object-contain mt-[10%]"
            />
          </ThemedView>
        </ThemedView>
        <ThemedView key="2">
          <Image
            source={welcome_2}
            style={{
              height: 300,
              width: 280,
              objectFit: "contain",
              marginTop: "20%",
              marginHorizontal: "auto",
            }}
            // className="object-fill w-60 h-60"
          />
          <ThemedView style={{ paddingHorizontal: 20 }} className="px-10">
            <ThemedText
              type="title"
              style={{ textAlign: "center" }}
              className="text-center"
            >
              Welcome to NINAuth
            </ThemedText>
            {/* <HelloWave /> */}
            <ThemedText type="default" className="text-center">
              Ensure your privacy, manage and control access to your NIN data
            </ThemedText>

            <Image
              source={nav_2}
              className="mx-auto h-5 w-16 rounded-md object-contain mt-[10%]"
            />
          </ThemedView>
        </ThemedView>
        <ThemedView key="3">
          <Image
            source={welcome_3}
            style={{
              height: 300,
              width: 280,
              objectFit: "contain",
              marginTop: "20%",
              marginHorizontal: "auto",
            }}
            // className="object-fill w-60 h-60"
          />
          <ThemedView style={{ paddingHorizontal: 20 }} className="px-10">
            <ThemedText
              type="title"
              style={{ textAlign: "center" }}
              className="text-center"
            >
              Welcome to NINAuth
            </ThemedText>
            {/* <HelloWave /> */}
            <ThemedText type="default" className="text-center">
              Ensure your privacy, manage and control access to your NIN data
            </ThemedText>

            <Image
              source={nav_3}
              className="mx-auto h-5 w-16 rounded-md object-contain mt-[10%]"
            />
          </ThemedView>
        </ThemedView>
      </PagerView>
      <ThemedView>
        <Text
          style={{ textAlign: "center", marginHorizontal: 30, marginTop: 20 }}
        >
          By continuing you declare that you have read and agreed to the Privacy
          Notice
        </Text>
      </ThemedView>
      <Button
        title={"Sign in with NIMC"}
        onPress={handlePress}
        isFull={false}
        className={""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
