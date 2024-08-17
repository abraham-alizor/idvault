import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const RevokeAccessModal = (props: any) => {
  const [reason, setReason] = useState("");
  const snapPoints = useMemo(() => ["50%", "50%"], []);
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
        {/* <BlurView intensity={10} style={styles.modalOverlay} tint="dark"> */}
        <View className="px-6 mt-10">
          <View style={styles.header}>
            <Ionicons
              name="warning"
              size={60}
              color="#EE5138"
              className="mx-auto"
            />
            <TouchableOpacity
              className="absolute right-0"
              onPress={() => props.bottomSheetModalRef.current?.close()}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Revoke access to your data?</Text>

          <Text style={styles.description}>
            This organization will no longer have access to your data
          </Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={reason}
              onValueChange={(itemValue) => setReason(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a reason" value="" />
              <Picker.Item label="No longer needed" value="not_needed" />
              <Picker.Item label="Security concerns" value="security" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.revokeButton}
            onPress={() => {
              props.bottomSheetModalRef.current?.close();
              router.replace("(home)");
            }}
            className="mt-10"
          >
            <Text style={styles.revokeButtonText}>Revoke access</Text>
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
    fontWeight: "bold",
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

export default RevokeAccessModal;
