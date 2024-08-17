import React from "react";
import FilterDate from "../FilterDate";
import useBottomSheetContext from "@/hooks/modals/useContextModals";

const useFilterDateModal = () => {
  const { createBottomSheet, dismissBottomSheet } = useBottomSheetContext();

  const openFilterDateModal = (props: {
    buttonLabel?: any;
    onProceed: (value: any) => void;
  }) => {
    createBottomSheet({
      _content: () => (
        <FilterDate dismissBottomSheet={dismissBottomSheet} {...props} />
      ),
      _snapPoints: ["80%", "80%"],
      _title: "Filter Date",
    });
  };

  return {
    openFilterDateModal,
  };
};

export default useFilterDateModal;
