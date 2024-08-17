import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { calender } from "@/assets/images";

const { width } = Dimensions.get("screen");
const FilterDate = (props: any) => {
  const [period, setPeriod] = useState("Custom period");

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const onChangeStart = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || props.startDate;
    setShowStartPicker(false);
    props.setStartDate(currentDate);
    props.setDate(true);
  };

  const onChangeEnd = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || props.endDate;
    setShowEndPicker(false);
    props.setEndDate(currentDate);
    props.setDate(true);
  };

  // variables
  const snapPoints = useMemo(() => ["100%", "100%"], []);

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={props.handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                props.bottomSheetModalRef.current?.close();
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Filter</Text>

            <Text style={styles.sectionTitle}>Period</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  period === "Custom period" && styles.activeButton,
                ]}
                onPress={() => setPeriod("Custom period")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    period === "Custom period" && styles.activeText,
                  ]}
                >
                  Custom period
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  period === "Current week" && styles.activeButton,
                ]}
                onPress={() => setPeriod("Current week")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    period === "Current week" && styles.activeText,
                  ]}
                >
                  Current week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  period === "Last week" && styles.activeButton,
                ]}
                onPress={() => setPeriod("Last week")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    period === "Last week" && styles.activeText,
                  ]}
                >
                  Last week
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowStartPicker(true)}
            >
              <Text>{props.startDate.toDateString()}</Text>
              <Image source={calender} className="h-4 w-4" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowEndPicker(true)}
            >
              <Text>{props.endDate.toDateString()}</Text>
              <Image source={calender} className="h-4 w-4" />
            </TouchableOpacity>

            {showStartPicker && (
              <DateTimePicker
                value={props.startDate}
                mode="date"
                display="default"
                onChange={onChangeStart}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={props.endDate}
                mode="date"
                display="default"
                onChange={onChangeEnd}
              />
            )}
          </View>

          <ThemedView className="flex-row justify-between items-center ">
            <TouchableOpacity
              onPress={() => {
                props.setDate(false);
              }}
              className={
                "py-4 px-4 w-[48%] flex justify-around items-center flex-row my-2 mx-auto rounded-lg  bg-[#C9D7D2] border border-brand"
              }
            >
              <ThemedText className=" font-semibold text-brand text-center">
                Clear all
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.bottomSheetModalRef.current?.close();
              }}
              className={"py-4 px-4 w-[48%] my-2 mx-auto rounded-lg bg-brand"}
            >
              <ThemedText className="text-white font-semibold text-center">
                Apply
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // alignItems: "center",
  },

  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    width: width * 0.28,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#e6f7ef",
    borderColor: "#008643",
  },
  activeText: {
    textAlign: "center",
    color: "#008643",
  },
  buttonText: {
    textAlign: "center",
    color: "#333",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  clearButtonText: {
    color: "#4CAF50",
  },
  applyButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  applyButtonText: {
    color: "white",
  },
});

export default FilterDate;
