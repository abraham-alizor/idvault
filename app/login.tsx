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
import * as yup from "yup";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { generateSignature } from "@/utils/functions/auth";
import { useToast } from "react-native-toast-notifications";

const schema = yup
  .object({
    NIN: yup.string().length(11).required("NIN is required!"),
  })
  .required();

export default function Login() {
  const { signIn, setDataState } = useSession();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Usage
  const { timestamp, signature } = generateSignature();

  // {
  //   "test_url": "https://sdktest.smileidentity.com/",
  //   "test_lambda_url": "https://testapi.smileidentity.com/v1/",
  //   "prod_url": "https://sdk.smileidentity.com/",
  //   "prod_lambda_url": "https://api.smileidentity.com/v1/",
  //   "auth_token": "XI8dhliRB5sMJrEG3Hqyr1pvg0RIURNEpCTde65AUzPHo0au7EMYZqJWeu9Jkje1qlNgCPMPUF2gJVhCujOkYCbW2QSwHTEBwDwdr/K3gOq7gEfumiheIUI1MhbBO/Qdl3dLu9UtUKsnXEC9nXAmwIEydxSON88Kk/f/BkTvzpI=",
  //   "partner_id": "100",
  //   "version": "1.0.0"
  // }

  const router = useRouter(); // Use your routing hook or method here

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.smileidentity.com/v1/id_verification",
        {
          source_sdk: "rest_api",
          source_sdk_version: "1.0.0",
          // signature: signature,
          sec_key:
            "KkAmo8wNajWV76AiqvcfZt2sQ7CSF1ncS3moUVDZx6aUt6Q0vQyjRJAm/TThw6RMohB3VVpKTZfzUgS8zA4an1aud+/jYPDUekQfaS8b2K59IPxFEbYX0YbF24si2+dIjxn36Z/+Y8g4I4zOo9sBKvkAngvNOwJGr2G6i26R5co=|9db44506f4e19e281e3a24583c3ad3b7500441d1c5e0acee4f9a07ea655614ec",
          // timestamp: timestamp,
          timestamp: "1652877946",
          partner_params: {
            user_id: "",
            job_id: "",
            job_type: 5,
          },
          country: "NG",
          id_type: "NIN_V2",
          id_number: "42286172538",
          callback_url: "https://dddddd.com/verify-photo",
          partner_id: "100",
        }
      );

      if (response) {
        setDataState(response?.data);
        setLoading(false);
        toast.show("NIN Verified Successfully", {
          type: "success",
          placement: "bottom",
          duration: 4000,

          animationType: "zoom-in",
        }),
          router.push("verify-photo");
      } else {
        setLoading(false);
        console.error("Error submitting data:", response);
        toast.show("Request verification failed", { type: "danger" });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting data:", error); // Log or handle error
      toast.show("Request verification failed", { type: "danger" });
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={
        <View className="mt-12">
          <BackButton />
        </View>
      }
      childrenClassName={"bg-white"}
    >
      <ThemedView>
        <ThemedText type="title" style={{ textAlign: "left" }}>
          Enter your National Identification Number
        </ThemedText>
        <ThemedText type="default" style={{ marginTop: 20 }}>
          Please enter your identity number to proceed. Your information is
          secure with us and will be used solely for verification purposes.
        </ThemedText>
      </ThemedView>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            placeholder="Enter your NIN Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            keyboardType="number-pad"
            autoCapitalize="none"
          />
        )}
        name="NIN"
      />
      {errors.NIN && <Text style={styles.errorText}>{errors.NIN.message}</Text>}

      <Button
        activityLoading={loading}
        title="Continue"
        isFull
        onPress={handleSubmit(onSubmit)}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
