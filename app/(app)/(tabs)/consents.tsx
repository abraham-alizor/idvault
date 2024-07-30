import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { avatar, calender } from "@/assets/images";
import FormTextInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function TabTwoScreen() {
  const [active, setActive] = useState(1);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event: any, selectedDate: any) => {
    if (Platform.OS === "android") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    }
  };

  const showMode = (currentMode: string) => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    } else {
      setShow(true);
      setMode(currentMode);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  console.log(date);

  return (
    <ParallaxScrollView
      childrenClassName="bg-neutral-bg"
      headerBackgroundColor={{ light: "#F5F4F3", dark: "#F5F4F3" }}
      headerImage={
        <ThemedView className="mt-10 px-4 flex-row justify-between items-center bg-neutral-bg">
          <ThemedText type="title">Consents</ThemedText>
          <Image source={avatar} className="h-12 w-12" />
        </ThemedView>
      }
    >
      <ThemedView className="flex-row justify-between items-center bg-white rounded-lg">
        <TouchableOpacity
          onPress={() => {
            setActive(1);
          }}
          className={`${
            active === 1 ? "bg-light-green" : "bg-white"
          } py-3 px-4 w-[48%] my-2 mx-auto rounded-lg `}
        >
          <ThemedText className="text-black font-bold text-center">
            Approved access
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive(2);
          }}
          className={`${
            active === 2 ? "bg-light-green" : "bg-white"
          } py-3 px-4 w-[48%] my-2 mx-auto rounded-lg `}
        >
          <ThemedText className="text-black font-bold text-center">
            Rejected
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {active === 1 ? (
        <ThemedView className="bg-white p-4">
          <ThemedView className="flex justify-between items-center flex-row">
            <FormTextInput
              className="rounded-full bg-[#F2F2F2] py-4 h-10 px-4 w-[80%]"
              placeholder="Enter your NIN Number"
              // onChangeText={onChange}
              // value={value}

              keyboardType="number-pad"
              autoCapitalize="none"
            />
            <TouchableOpacity
              className="bg-neutral-bg  rounded-full w-12 h-12 flex justify-center flex-row items-center"
              onPress={showDatepicker}
            >
              <Image source={calender} className="h-6 w-6" />
            </TouchableOpacity>
          </ThemedView>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </ThemedView>
      ) : (
        <>
          <ThemedView className="bg-white justify-between flex-wrap  py-4 rounded-lg px-2 ">
            <Collapsible title="File-based routing">
              <ThemedText>
                This app has two screens:{" "}
                <ThemedText type="defaultSemiBold">
                  app/(tabs)/index.tsx
                </ThemedText>{" "}
                and{" "}
                <ThemedText type="defaultSemiBold">
                  app/(tabs)/explore.tsx
                </ThemedText>
              </ThemedText>
              <ThemedText>
                The layout file in{" "}
                <ThemedText type="defaultSemiBold">
                  app/(tabs)/_layout.tsx
                </ThemedText>{" "}
                sets up the tab navigator.
              </ThemedText>
              <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="link">Learn more</ThemedText>
              </ExternalLink>
            </Collapsible>
          </ThemedView>
        </>
      )}
    </ParallaxScrollView>
  );
}
