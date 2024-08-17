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
  copy,
  gtb,
  mockphone,
  pin,
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
import RevokeAccessModal from "@/components/modals/RevokeAccessModal";

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
        <View className="mt-12">
          <BackButton />
        </View>
      }
    >
      <ThemedView className="">
        <ThemedText type="title">Guaranteed Trust Bank</ThemedText>
        <ThemedText className="mt-2 ">Shared via QR code</ThemedText>
        <ThemedText className="mt-2 text-gray-400">1 minutes ago</ThemedText>
      </ThemedView>

      <ThemedView className="flex-row justify-between items-center ">
        <TouchableOpacity
          onPress={handlePresentModalPress}
          className={"py-4 px-4 w-[48%] my-2 mx-auto rounded-lg bg-brand"}
        >
          <ThemedText className="text-white font-semibold text-center">
            Revoke access
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setActive(1);
          }}
          className={
            "py-4 px-4 w-[48%] flex justify-around items-center flex-row my-2 mx-auto rounded-lg  bg-[#C9D7D2] border border-[#C9D7D2]"
          }
        >
          <ThemedText className=" font-semibold text-center">
            ID:263662
          </ThemedText>
          <Image source={copy} className="w-4 h-4" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView className=" items-center justify-between bg-white p-2 rounded-lg">
        <ThemedView className="flex-col items-center justify-start">
          <Image source={gtb} className="w-12 h-12" />
          <ThemedText className="mt-2 font-bold ml-4">
            Your data was shared with GT Bank
          </ThemedText>
        </ThemedView>
        <ThemedText className="mt-2 text-center text-gray-400  ml-4">
          This one-time access included only the information you selected.
        </ThemedText>
        <ThemedView className="mt-2 flex-row items-center justify-center">
          <Image source={copy} className="w-4 h-4" />
          <ThemedText className=" text-center text-brand  ml-4">
            https://www.gtbank.com
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView className="w-full flex flex-col justify-between my-4 bg-white px-6 py-4">
        <ThemedText className="mt-2 font-bold mb-6">Summary</ThemedText>
        <ThemedView className="flex-row justify-start gap-x-4 mb-4 ">
          <ThemedView>
            <Image source={pin} className=" rounded-full" />
          </ThemedView>
          <ThemedView>
            <ThemedText className="font-bold text-[17px]">
              Account opening
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView className="flex-row justify-start gap-x-4 mb-4 ">
          <ThemedView>
            <Image source={pin} className=" rounded-full" />
          </ThemedView>
          <ThemedView>
            <ThemedText className="font-bold text-[17px]">
              Biodata, contact information, address, photo and signature
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView className="flex-row justify-start gap-x-4 mb-4 ">
          <ThemedView>
            <Image source={pin} className=" rounded-full w-4" />
          </ThemedView>
          <ThemedView>
            <ThemedText className="font-bold text-[17px]">
              Consent given by Bisola Adegoke
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <RevokeAccessModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={handleSheetChanges}
        handlePresentModalPress={handlePresentModalPress}
      />
    </ParallaxScrollView>
  );
}
