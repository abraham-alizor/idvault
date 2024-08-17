import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useSession } from "@/context/ContextProvider";
import {
  alarm,
  avatar,
  mockphone,
  QR,
  QR_bg,
  QR_icon,
  time,
} from "@/assets/images";
import Button from "@/components/Button";
import useCountdown from "@/hooks/useCountDown";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { signOut } = useSession();
  const [active, setActive] = useState(1);
  const endTime = new Date().getTime() + 120000 * 1; // 2 minutes
  const [timeLeft, setEndTime] = useCountdown(endTime) as any;
  const [timedOut, setTimedOut] = useState(false);
  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;
  const router = useRouter();
  useEffect(() => {
    (() => {
      if (minutes == 0 && seconds == 0) {
        setTimedOut(true);
      }
    })();
  }, [minutes, seconds]);
  // signOut();
  return (
    <ParallaxScrollView
      childrenClassName="bg-neutral-bg"
      headerBackgroundColor={{ light: "#F5F4F3", dark: "#F5F4F3" }}
      headerImage={
        <ThemedView className="mt-10 px-4 flex-row justify-between items-center bg-neutral-bg">
          <ThemedText type="title">Home</ThemedText>
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
            My digital ID
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
            Scan QR code
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {active === 1 ? (
        <ThemedView className="bg-neutral-bg">
          <Image
            source={QR}
            className="h-[30vh] object-contain w-[80%] mx-auto"
          />
          <ThemedView className="bg-light-green  flex-row justify-center items-center w-24 rounded-lg mt-4 mx-auto py-1">
            <Image source={time} className="h-6 object-contain w-6" />
            <ThemedText
              type="defaultSemiBold"
              className="text-center text-brand ml-2"
            >
              {minutes} : {seconds}
            </ThemedText>
          </ThemedView>

          <ThemedView className="bg-white flex-row justify-between flex-wrap  py-4 rounded-lg px-2 mt-4">
            <ThemedView className="w-[14%]">
              <Image
                source={QR_bg}
                className="rounded-xl h-12  w-12 object-contain  "
              />
            </ThemedView>
            <ThemedView className="w-[85%]">
              <ThemedText className="font-bold ml-1">
                Allow scan to give access to your NIN data
              </ThemedText>
              <ThemedText className="mt-2 text-sm ml-1">
                Your QR code is your digital ID. When you share it with an
                organization, you can select what information can be shared with
                them.
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView className="bg-white flex-row justify-between flex-wrap  py-4 rounded-lg px-2 mt-2">
            <ThemedView className="w-[14%]">
              <Image
                source={alarm}
                className="rounded-xl h-12  w-12 object-contain  "
              />
            </ThemedView>
            <ThemedView className="w-[85%]">
              <ThemedText className="font-bold ml-1">
                QR code changes every 2 minutes
              </ThemedText>
              {/* <ThemedText className="mt-2 text-sm ml-1">
              Your QR code is your digital ID. When you share it with an
              organization, you can select what information can be shared with
              them.
            </ThemedText> */}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ) : (
        <>
          <ThemedView className="bg-white justify-between flex-wrap  py-4 rounded-lg px-2 ">
            <ThemedView className="flex justify-start items-start flex-row">
              <Image
                source={QR_bg}
                className="rounded-xl h-12  w-12 object-contain  "
              />
              <ThemedText className="font-bold ml-4">
                Scan QR code to give consent
              </ThemedText>
            </ThemedView>
            <ThemedView className="w-full justify-start flex-row mt-4">
              <ThemedView className=" ml-1 w-[80%]">
                <ThemedText>
                  Point your camera at the organization’s QR code to choose
                  which NIN details you would like to share.
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    router.push("(consent)/qr-scan");
                  }}
                  className={`border-brand border py-3 px-4 my-2 w-44 rounded-lg `}
                >
                  <ThemedText className="text-brand font-bold text-center">
                    Scan QR code
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
              <Image
                source={QR_icon}
                className="rounded-xl h-16  w-16 object-contain  "
              />
            </ThemedView>
          </ThemedView>
          <ThemedView className="bg-white justify-between flex-wrap  py-4 rounded-lg px-2 ">
            <ThemedView className="flex justify-start items-start flex-row">
              <Image
                source={mockphone}
                className="rounded-xl h-12  w-12 object-contain  "
              />
              <ThemedText className="font-bold ml-4">
                Enter request ID
              </ThemedText>
            </ThemedView>
            <ThemedView className="w-full justify-start flex-row mt-4">
              <ThemedView className=" ml-1 w-[80%]">
                <ThemedText>
                  Point your camera at the organization’s QR code to choose
                  which NIN details you would like to share.
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    router.push("(consent)/OtpPage");
                  }}
                  className={`border-brand border py-3 px-4 my-2 w-44 rounded-lg `}
                >
                  <ThemedText className="text-brand font-bold text-center">
                    Scan QR code
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>

              <Image
                source={mockphone}
                className=" h-16  w-16 object-contain  "
              />
            </ThemedView>
          </ThemedView>
        </>
      )}
    </ParallaxScrollView>
  );
}
