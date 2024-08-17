// app/login.js
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import FormTextInput from "@/components/FormInput";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ContextProvider";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { placeholder_Image } from "@/assets/images";

export default function QrCodeScanner() {
  const { signIn } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string }>();

  const onSubmit = () => {
    signIn();
  };

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  //   const permissionRequest = () => {
  //     const response  = await requestPermission
  //   }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={
        <View className="mt-12">
          <BackButton />
        </View>
      }
    >
      <ThemedView className="bg-red-500">
        <ThemedText type="title" style={{ textAlign: "left" }}>
          Let’s verify your identi
        </ThemedText>
        <ThemedText type="default" style={{ marginTop: 20 }}>
          Take a picture of yourself to confirm that your are the owner of the
          identity number.
        </ThemedText>

        {!permission.granted ? (
          <Pressable
            className="flex-1 justify-center"
            onPress={requestPermission}
          >
            <Image
              source={placeholder_Image}
              className="h-60 w-60 my-10 mx-auto"
            />
          </Pressable>
        ) : (
          <Pressable
            className="flex-1 justify-center"
            onPress={() => router.push("/photo-capture")}
          >
            <Image
              source={params.uri ? { uri: params.uri } : placeholder_Image}
              className="h-60 w-60 my-10 mx-auto rounded-full"
            />
          </Pressable>
        )}
        <ThemedView className="mt-1 bg-light-green px-4 py-2 rounded-xl">
          <ThemedText type="default">
            If you wear glasses, you can keep them on - but please remove
            anything else that could hide your face (like caps, sunglasses or
            scarves).
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <Button title="Continue" isFull onPress={handleSubmit(onSubmit)} />
    </ParallaxScrollView>
  );
}
