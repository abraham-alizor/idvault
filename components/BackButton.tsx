import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BackButton = (props: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ marginTop: 50, marginLeft: 20 }}
    >
      <Ionicons
        name="chevron-back"
        size={28}
        color={props.color ? props.color : "#008643"}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
