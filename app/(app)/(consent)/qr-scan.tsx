import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import FormTextInput from "@/components/FormInput";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ContextProvider";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { placeholder_Image, qrgreen } from "@/assets/images";
import { Entypo, Ionicons } from "@expo/vector-icons";
import CameraComponent from "@/components/Camera";

export default function QrCodeScannerScreen() {
  const { signIn } = useSession();
  const cameraRef = useRef<any>(null);
  const [cleanup, setCleanup] = useState(0);
  const [flash, setFlash] = useState<FlashMode>("off");
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

  const handleBarcodeScanned = (data: any) => {
    if (data && cleanup === 0) {
      setCleanup(1);
      router.push({
        pathname: "(consent)/data-consent",
        params: data,
      });
    }
  };

  return (
    <ParallaxScrollView
      childrenClassName="bg-black"
      headerBackgroundColor={{ light: "#000", dark: "#000" }}
      headerImage={<BackButton />}
    >
      <ThemedView className="flex-1 bg-black ">
        <Image source={qrgreen} className="h-20 w-20 mx-auto" />
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
          <ThemedView className="mt-10 bg-black">
            <CameraComponent
              flash={flash}
              cameraRef={cameraRef}
              isBarCode
              handleBarcodeScanned={handleBarcodeScanned}
            />
          </ThemedView>
        )}
        <ThemedText className="text-white text-center mt-4">
          Ensure the bar code fits the scan area{" "}
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            flash === "on" ? setFlash("off") : setFlash("on");
          }}
          className={
            "mt-12 mr-5 bg-[#4D4D4D] w-16 h-16 mx-auto  rounded-full p-1 flex justify-center items-center"
          }
        >
          {flash === "off" ? (
            <Ionicons
              name="flash-off"
              className="text-brand "
              size={36}
              color="#008643"
            />
          ) : (
            <Entypo
              className="text-brand  "
              name={"flash"}
              size={36}
              color="#008643"
            />
          )}
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}
