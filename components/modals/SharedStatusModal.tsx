import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const SharedStatusModal = (props: any) => {
  const [reason, setReason] = useState("");
  const snapPoints = useMemo(() => ["30%", "30%"], []);
  const router = useRouter();
  return (
    <BottomSheetModal
      containerStyle={{ backgroundColor: "#00070C66" }}
      ref={props.bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={props.handleSheetChanges}
    >
      <BottomSheetView className="flex-1">
        <TouchableOpacity
          className="absolute right-4"
          onPress={() => props.bottomSheetModalRef.current?.close()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        {/* <BlurView intensity={10} style={styles.modalOverlay} tint="dark"> */}
        <View className="px-6 mt-2">
          <View style={styles.header}>
            <Ionicons
              name="checkmark-circle-outline"
              size={60}
              color="#00A86B"
            />
          </View>

          <Text style={styles.title}>The selected data has been shared </Text>

          <TouchableOpacity
            style={styles.revokeButton}
            onPress={() => {
              props.bottomSheetModalRef.current?.close();
              router.push("view-details");
            }}
            className="mt-10"
          >
            <Text style={styles.revokeButtonText}>View organization</Text>
          </TouchableOpacity>
        </View>
        {/* </BlurView> */}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  revokeButton: {
    backgroundColor: "#008643",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 5,
  },
  revokeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SharedStatusModal;
