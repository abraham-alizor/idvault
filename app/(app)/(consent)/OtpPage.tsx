import BackButton from "@/components/BackButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";

const { width, height } = Dimensions.get("screen");
function OtpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpText, setOtpText] = useState("");
  let otpInput = useRef(null);
  useEffect(() => {
    if (otpText.length === 6) {
      //   onSubmit();
    }
  }, [otpText]);
  const router = useRouter();
  const [data, setData] = useState({});
  return (
    <ParallaxScrollView
      childrenClassName="bg-neutral-bg"
      headerBackgroundColor={{ light: "#F5F4F3", dark: "#F5F4F3" }}
      headerImage={
        <View className="mt-12">
          <BackButton />
        </View>
      }
    >
      <ThemedView className="">
        <ThemedText type="title">Enter Request ID</ThemedText>
        <ThemedText className="mt-2">
          Enter the 6-digit code provided by the organization.
        </ThemedText>
      </ThemedView>

      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={10}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={s.container}
      >
        <View style={s.container}>
          <View style={s.otpContainer}>
            <OTPTextInput
              ref={otpInput}
              inputCount={6}
              handleTextChange={(code: string) => {
                setOtpText(code);
              }}
              keyboardType={"number-pad"}
              textInputStyle={s.otpTextStyle}
              containerStyle={{
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => {
          if (otpText.length === 6) {
            router.push({
              pathname: "(consent)/data-consent",
              params: data,
            });
          }
        }}
        className={`py-4 px-4 mt-8 w-full  mx-auto rounded-l bg-brand ${
          otpText.length === 6 ? "opacity-100" : "opacity-50"
        }`}
      >
        <ThemedText className="text-white font-semibold text-center">
          Continue
        </ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

export default OtpPage;

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 20,
    flex: 1,
  },
  otpContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  otpTextStyle: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFF",
    width: "15%",
  },
  otpInputStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
