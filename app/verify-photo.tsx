// app/login.js
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import FormTextInput from "@/components/FormInput";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ContextProvider";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import {
  useCameraDevice,
  useCameraPermission,
  CameraCaptureError,
  Camera,
  type CameraPosition,
  useFrameProcessor,
} from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";

import { scanFaces, type Face } from "vision-camera-trustee-face-detector-v3";

export default function VerifyPhoto() {
  const { signIn } = useSession();

  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera | null>(null);
  const device = useCameraDevice(position);
  const [faces, setFaces] = useState<Face>();
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, [requestPermission]);

  const handleFaceDetection = Worklets.createRunInJsFn((face: Face) => {
    setFaces(face);
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      try {
        const scannedFaces: any = scanFaces(frame, {});
        if (Object.keys(scannedFaces).length > 0) {
          handleFaceDetection(scannedFaces);
        }
      } catch (error) {}
    },
    [handleFaceDetection]
  );

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      setFaces(undefined);
      if (faces) {
        const shot = await cameraRef.current.takePhoto({});
        setPhoto(`file://${shot.path}`);
      } else {
        // Toast.show({
        //   type: 'info',
        //   text1: 'Please position your face in the frame and try again',
        // });
      }
    }
  };

  if (!hasPermission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#162D4C" />
      </View>
    );
  }

  if (device == null) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>No camera device found</Text>
      </View>
    );
  }

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

  // const [permission, requestPermission] = useCameraPermissions();

  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return <View />;
  // }

  //   const permissionRequest = () => {
  //     const response  = await requestPermission
  //   }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={<BackButton />}
    >
      <ThemedView>
        <ThemedText type="title" style={{ textAlign: "left" }}>
          Let’s verify your identity
        </ThemedText>
        <ThemedText type="default" style={{ marginTop: 20 }}>
          Take a picture of yourself to confirm that your are the owner of the
          identity number.
        </ThemedText>

        {/* {!permission.granted ? (
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
        )} */}

        <View style={styles.container}>
          {photo ? (
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <Image
                source={{ uri: photo }}
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
              />
            </View>
          ) : (
            <View style={{ flex: 1, position: "relative", borderRadius: 10 }}>
              <Camera
                ref={cameraRef}
                frameProcessor={frameProcessor}
                style={styles.camera}
                device={device}
                isActive={!!device}
                pixelFormat="yuv"
              />

              <View style={styles.bottomBar}>
                <TouchableOpacity
                  onPress={handleTakePicture}
                  style={styles.shutterButton}
                />
              </View>
            </View>
          )}
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    padding: 7,
    position: "relative",
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 24,
    position: "absolute",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bottomBar: {
    justifyContent: "center",
    position: "absolute",
    bottom: 32,
    width: "100%",
    alignItems: "center",
  },
  shutterButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
