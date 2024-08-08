import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "./ThemedView";

interface CustomButtonProps {}

const Button = ({
  title,
  onPress,
  isFull = false,
  activityLoading = false,
  className,
  icon = undefined,
}: {
  title: string;
  onPress: () => void;
  isFull?: boolean;
  className?: string;
  icon?: any;
  activityLoading?: boolean;
}) => {
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={onPress}
        className={`bg-[#008643] ${
          isFull ? "w-full" : "w-[90%]"
        } py-5 mt-8 mb-4 mx-auto rounded-lg  ${className}`}
      >
        {activityLoading ? (
          <ActivityIndicator color={"#FFF"} />
        ) : (
          <Text className="text-white text-center">{title}</Text>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default Button;
