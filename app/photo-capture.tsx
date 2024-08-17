// app/login.js
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import { FlashMode } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ContextProvider";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import CameraComponent from "@/components/Camera";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import Container from "@/components/Container";

export default function PhotoCapture() {
  const { signIn } = useSession();
  const [flash, setFlash] = useState<FlashMode>("off");
  const cameraRef = useRef<any>(null);
  const { height, width } = Dimensions.get("screen");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const router = useRouter();

  const onSubmit = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      if (photo) {
        router.replace({
          pathname: "/verify-photo",
          params: photo,
        });
      }
    }
  };

  return (
    <Container
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={
        <View className="mt-12 flex justify-between items-center flex-row">
          <BackButton />
          <TouchableOpacity
            onPress={() => {
              flash === "on" ? setFlash("off") : setFlash("on");
            }}
            className={
              " mr-5 bg-light-green rounded-full p-1 flex justify-center items-center"
            }
          >
            {flash === "off" ? (
              <Ionicons
                name="flash-off"
                className="text-dark-green  "
                size={36}
                color="black"
              />
            ) : (
              <Entypo
                className="text-dark-green  "
                name={"flash"}
                size={36}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      }
    >
      <ThemedView>
        <ThemedView style={{ height: height * 0.7 }}>
          <CameraComponent flash={flash} cameraRef={cameraRef} />

          <ThemedText
            type="defaultSemiBold"
            className="text-xl text-center mt-10"
          >
            Position your face in the oval
          </ThemedText>
        </ThemedView>

        <Button
          icon={
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          }
          title="Take Capture"
          className=""
          isFull
          onPress={handleSubmit(onSubmit)}
        />
      </ThemedView>
    </Container>
  );
}
