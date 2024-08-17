import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Checkbox from "expo-checkbox";

import { useSession } from "@/context/ContextProvider";
import {
  alarm,
  avatar,
  bank,
  gtb,
  mockphone,
  QR,
  QR_bg,
  QR_icon,
  time,
} from "@/assets/images";
import Button from "@/components/Button";
import useCountdown from "@/hooks/useCountDown";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RejectStatusModal from "@/components/modals/RejectStatusModal";
import SharedStatusModal from "@/components/modals/SharedStatusModal";

export default function DataConsentScreen() {
  const { signOut } = useSession();
  const [active, setActive] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const [isCheckedContact, setCheckedContact] = useState(false);
  const [isCheckedAddress, setCheckedAddress] = useState(false);
  const [isCheckedPlace, setCheckedPlace] = useState(false);
  const [isCheckedSignature, setCheckedSignature] = useState(false);
  const [isCheckedPhoto, setCheckedPhoto] = useState(false);
  const [isCheckedNok, setCheckedNok] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!isChecked);
  };
  const handleCheckContactToggle = () => {
    setCheckedContact(!isCheckedContact);
  };
  const handleCheckPlaceToggle = () => {
    setCheckedPlace(!isCheckedPlace);
  };
  const handleCheckAddressToggle = () => {
    setCheckedAddress(!isCheckedAddress);
  };
  const handleCheckNokToggle = () => {
    setCheckedNok(!isCheckedNok);
  };
  const handleCheckPhotoToggle = () => {
    setCheckedPhoto(!isCheckedPhoto);
  };
  const handleCheckSignatureToggle = () => {
    setCheckedSignature(!isCheckedSignature);
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetRejectModalRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentRejectModalPress = useCallback(() => {
    bottomSheetRejectModalRef.current?.present();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);
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
        <ThemedText type="title">Consent</ThemedText>
        <ThemedText className="mt-2">
          Select the information you would like to share with this organization
        </ThemedText>
      </ThemedView>
      <ThemedView className="flex-row items-center justify-between bg-white p-2 rounded-lg">
        <ThemedView className="flex-row items-center justify-start">
          <Image source={gtb} className="w-12 h-12" />
          <ThemedText className="mt-2 font-bold ml-4">
            Guaranty Trust Bank
          </ThemedText>
        </ThemedView>
        <Image source={bank} className="w-8 h-8" />
      </ThemedView>

      <ThemedText className="mt-2 font-bold">
        Only selected data will be shared
      </ThemedText>

      <ThemedView className="bg-white px-4 pb-5 pt-2 rounded-lg">
        <ThemedView className="flex-row justify-between items-center mt-4">
          <Pressable
            onPress={handleCheckboxToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isChecked}
              onValueChange={handleCheckboxToggle}
              color={isChecked ? "#008643" : undefined}
            />
            <ThemedText className="">BioData</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-red-500 w-1" />
        </ThemedView>
        <ThemedView className="flex-row justify-between items-center mt-6">
          <Pressable
            onPress={handleCheckContactToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isCheckedContact}
              onValueChange={handleCheckContactToggle}
              color={isCheckedContact ? "#008643" : undefined}
            />
            <ThemedText className="">Contact Information</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-brand w-1" />
        </ThemedView>
        <ThemedView className="flex-row justify-between items-center mt-6">
          <Pressable
            onPress={handleCheckAddressToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isCheckedAddress}
              onValueChange={handleCheckContactToggle}
              color={isCheckedAddress ? "#008643" : undefined}
            />
            <ThemedText className="">Address</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-amber-600 w-1" />
        </ThemedView>
        <ThemedView className="flex-row justify-between items-center mt-6">
          <Pressable
            onPress={handleCheckPlaceToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isCheckedPlace}
              onValueChange={handleCheckPlaceToggle}
              color={isCheckedPlace ? "#008643" : undefined}
            />
            <ThemedText className="">Place of Origin</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-black w-1" />
        </ThemedView>
        <ThemedView className="flex-row justify-between items-center mt-6">
          <Pressable
            onPress={handleCheckNokToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isCheckedNok}
              onValueChange={handleCheckNokToggle}
              color={isCheckedNok ? "#008643" : undefined}
            />
            <ThemedText className="">Next of Kin</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-lime-500 w-1" />
        </ThemedView>
        <ThemedView className="flex-row justify-between items-center mt-6">
          <Pressable
            onPress={handleCheckPhotoToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isCheckedPhoto}
              onValueChange={handleCheckPhotoToggle}
              color={isCheckedPhoto ? "#008643" : undefined}
            />
            <ThemedText className="">Photograpgh</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-red-500 w-1" />
        </ThemedView>
        <ThemedView className="flex-row justify-between items-center mt-6">
          <Pressable
            onPress={handleCheckSignatureToggle}
            className="w-[90%] flex-row gap-x-4 items-center"
          >
            <Checkbox
              className="border-[0.5px] rounded  p-2"
              value={isCheckedSignature}
              onValueChange={handleCheckSignatureToggle}
              color={isCheckedSignature ? "#008643" : undefined}
            />
            <ThemedText className="">Signature</ThemedText>
          </Pressable>
          <ThemedView className="h-6 bg-blue-600 w-1" />
        </ThemedView>
      </ThemedView>
      <ThemedView className="flex-row justify-between items-center ">
        <TouchableOpacity
          onPress={() => {
            handlePresentRejectModalPress();
          }}
          className={
            "py-4 px-4 w-[48%] my-2 mx-auto rounded-lg  bg-white border border-red-600"
          }
        >
          <ThemedText className="text-red-600 font-semibold text-center">
            Reject
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePresentModalPress();
          }}
          className={"py-4 px-4 w-[48%] my-2 mx-auto rounded-lg bg-brand"}
        >
          <ThemedText className="text-white font-semibold text-center">
            Share Data
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <RejectStatusModal
        bottomSheetModalRef={bottomSheetRejectModalRef}
        handlePresentModalPress={handlePresentRejectModalPress}
        handleSheetChanges={handleSheetChanges}
      />
      <SharedStatusModal
        bottomSheetModalRef={bottomSheetModalRef}
        handlePresentModalPress={handlePresentModalPress}
        handleSheetChanges={handleSheetChanges}
      />
    </ParallaxScrollView>
  );
}
