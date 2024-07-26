import { placeholder_Image } from "@/assets/images";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import React, { useRef } from "react";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function CameraComponent({
  flash = "off",
  cameraRef = null,
  isBarCode,
  handleBarcodeScanned = () => {},
}: {
  flash: FlashMode;
  cameraRef: any;
  isBarCode?: boolean;
  handleBarcodeScanned?: (data: any) => void;
}) {
  const [facing, setFacing] = useState<CameraType>(
    isBarCode ? "back" : "front"
  );
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Pressable className="flex-1 justify-center" onPress={requestPermission}>
        <Image source={placeholder_Image} className="h-60 w-60 my-10 mx-auto" />
      </Pressable>
    );
  }

  return (
    <View className="flex">
      {isBarCode ? (
        <CameraView
          ref={cameraRef}
          enableTorch={flash === "off" ? false : true}
          className="w-80 h-80 mx-auto overflow-hidden rounded-md"
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(data) => {
            handleBarcodeScanned(data);
          }}
        />
      ) : (
        <CameraView
          ref={cameraRef}
          flash={flash}
          className="w-64 h-80 mx-auto overflow-hidden rounded-full"
          facing={facing}
        />
      )}
    </View>
  );
}
