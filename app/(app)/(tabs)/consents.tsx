import React, { useCallback, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { avatar, calender, gtb } from "@/assets/images";
import FormTextInput from "@/components/FormInput";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import useFilterDateModal from "@/components/modals/FilterDateModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FilterDate from "@/components/FilterDate";

export default function TabTwoScreen() {
  const [active, setActive] = useState(1);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [date, setDate] = useState(false);
  const [mode, setMode] = useState("date");
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
              className="rounded-full bg-[#F2F2F2] py-3 px-4 w-[80%]"
              placeholder="Enter your NIN Number"
              // onChangeText={onChange}
              // value={value}

              keyboardType="number-pad"
              autoCapitalize="none"
            />
            <TouchableOpacity
              className="bg-neutral-bg  rounded-full w-12 h-12 flex justify-center flex-row items-center"
              onPress={handlePresentModalPress}
            >
              <Image source={calender} className="h-6 w-6" />
            </TouchableOpacity>
          </ThemedView>

          {date && (
            <ThemedView className="bg-[#F2F2F2] my-4 py-2 px-4 rounded-3xl flex-row justify-between items-center">
              <ThemedText>
                {startDate.toDateString()} - {endDate.toDateString()}
              </ThemedText>
              <TouchableOpacity
                onPress={() => {
                  setDate(false);
                }}
              >
                <Text className="text-2xl">×</Text>
              </TouchableOpacity>
            </ThemedView>
          )}
          <Pressable onPress={() => router.push("view-details")}>
            <ThemedView className="w-full flex flex-row justify-between items-center my-4">
              <ThemedView className="flex-row justify-start gap-x-4 items-center w-[80%]">
                <ThemedView className="bg-brand w-1 h-16" />
                <ThemedView>
                  <ThemedText className="font-bold text-[17px]">
                    Guaranteed Trust bank
                  </ThemedText>
                  <ThemedText className="text-gray-400">
                    Account Opening
                  </ThemedText>
                  <ThemedText>26-July-2024</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView>
                <Image source={gtb} className="h-12 w-12 rounded-full" />
              </ThemedView>
            </ThemedView>
          </Pressable>
        </ThemedView>
      ) : (
        <>
          <ThemedView className="bg-white p-4">
            <ThemedView className="flex justify-between items-center flex-row">
              <FormTextInput
                className="rounded-full bg-[#F2F2F2] py-3 px-4 w-[80%]"
                placeholder="Enter your NIN Number"
                // onChangeText={onChange}
                // value={value}

                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="bg-neutral-bg  rounded-full w-12 h-12 flex justify-center flex-row items-center"
                onPress={handlePresentModalPress}
              >
                <Image source={calender} className="h-6 w-6" />
              </TouchableOpacity>
            </ThemedView>

            {date && (
              <ThemedView className="bg-[#F2F2F2] my-4 py-2 px-4 rounded-3xl flex-row justify-between items-center">
                <ThemedText>
                  {startDate.toDateString()} - {endDate.toDateString()}
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    setDate(false);
                  }}
                >
                  <Text className="text-2xl">×</Text>
                </TouchableOpacity>
              </ThemedView>
            )}
            <Pressable onPress={() => router.push("view-details")}>
              <ThemedView className="w-full flex flex-row justify-between items-center my-4">
                <ThemedView className="flex-row justify-start gap-x-4 items-center w-[80%]">
                  <ThemedView className="bg-brand w-1 h-16" />
                  <ThemedView>
                    <ThemedText className="font-bold text-[17px]">
                      Guaranteed Trust bank
                    </ThemedText>
                    <ThemedText className="text-gray-400">
                      Account Opening
                    </ThemedText>
                    <ThemedText>26-July-2024</ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedView>
                  <Image source={gtb} className="h-12 w-12 rounded-full" />
                </ThemedView>
              </ThemedView>
            </Pressable>
          </ThemedView>
        </>
      )}
      <FilterDate
        {...{
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          setDate,
        }}
        handleSheetChanges={handleSheetChanges}
        bottomSheetModalRef={bottomSheetModalRef}
      />
    </ParallaxScrollView>
  );
}
