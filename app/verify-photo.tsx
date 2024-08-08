// app/login.js
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import FormTextInput from "@/components/FormInput";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ContextProvider";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { placeholder_Image } from "@/assets/images";
import * as FileSystem from "expo-file-system";
import { zip } from "react-native-zip-archive";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

const ZipImages = async (imageUris: any[], setZipData: any) => {
  try {
    // Create a temporary directory to store the ZIP file
    const zipDirectory = FileSystem.documentDirectory + "zip/";
    await FileSystem.makeDirectoryAsync(zipDirectory, { intermediates: true });

    // Define the path where the ZIP file will be stored
    const zipPath = zipDirectory + "images.zip";

    // Create the ZIP file
    const result = await zip(imageUris, zipPath);
    setZipData(result);
    // Handle success
    Alert.alert("Success", `ZIP file created at: ${result}`);
  } catch (error) {
    // Handle error
    Alert.alert("Error", `Failed to create ZIP file: ${error.message}`);
  }
};
export default function VerifyPhoto() {
  const { signIn } = useSession();
  const toast = useToast();
  const [zipData, setZipData] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string }>();
  const imageArray = [params?.uri];
  // const imageArray = [
  //   {
  //     image_type_id: 1,

  //     image: params.uri,

  //     file_name: "selfie",
  //   },
  // ];

  const handleZip = async () => {
    if (imageArray.length > 0) {
      const response = await ZipImages(imageArray, setZipData);

      return response;
    } else {
      Alert.alert("No Images", "Please capture some images first.");
    }
  };
  console.log(params?.uri);

  useEffect(() => {
    if (params?.uri !== undefined) {
      handleZip();
    }
  }, [params?.uri]);
  // Usage

  // console.log(params);

  const onSubmit = async (data: any) => {
    const formData = new FormData() as any;

    formData.append("images[]", {
      image_type_id: 1,
      image: zipData,
      file_name: "selfie",
    });
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.smileidentity.com/v1/upload",
        {
          source_sdk: "rest_api",
          source_sdk_version: "1.0.0",
          model_parameters: {},
          file_name: "selfie.zip",
          sec_key:
            "KkAmo8wNajWV76AiqvcfZt2sQ7CSF1ncS3moUVDZx6aUt6Q0vQyjRJAm/TThw6RMohB3VVpKTZfzUgS8zA4an1aud+/jYPDUekQfaS8b2K59IPxFEbYX0YbF24si2+dIjxn36Z/+Y8g4I4zOo9sBKvkAngvNOwJGr2G6i26R5co=|9db44506f4e19e281e3a24583c3ad3b7500441d1c5e0acee4f9a07ea655614ec",

          timestamp: "1652877946",
          partner_params: {
            user_id: `user-${"1"}`,
            job_id: "",
            job_type: 4,
          },

          callback_url: "",
          partner_id: "100",
        }
      );

      if (response) {
        setLoading(false);
        console.log(response?.upload_url);
        const upload = await axios.put(response?.upload_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (upload) {
          console.log(upload);
          toast.show("Request verification failed", { type: "success" });
        }
      } else {
        setLoading(false);
        console.error("Request failed with status:", response);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting data:", error); // Log or handle error
    }
  };
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={<BackButton />}
    >
      <ThemedView className="" style={{ flex: 0.9 }}>
        <ThemedText type="title" style={{ textAlign: "left" }}>
          Let’s verify your identity
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

      <Button
        activityLoading={loading}
        title="Continue"
        isFull
        onPress={handleSubmit(onSubmit)}
      />
    </ParallaxScrollView>
  );
}
