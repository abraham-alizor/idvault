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
import { StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

const schema = yup
  .object({
    NIN: yup.string().length(11).required("NIN is required!"),
  })
  .required();

export default function Login() {
  const { signIn } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const onSubmit = (data: any) => {
    console.log(data);
    router.push("/verify-photo");
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={<BackButton />}
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

      <Button title="Continue" isFull onPress={handleSubmit(onSubmit)} />
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
