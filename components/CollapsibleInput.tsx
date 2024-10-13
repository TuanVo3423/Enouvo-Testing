import { ApprovalMatrixType } from "@/interface/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface CollapsibleInputProps {
  feature?: ApprovalMatrixType;
  setFeature: (feature: ApprovalMatrixType) => void;
  errorMessages?: string;
}

export function CollapsibleInput({
  feature,
  setFeature,
  errorMessages,
}: CollapsibleInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const renderColor = useMemo(() => (isOpen ? "orange" : "gray"), [isOpen]);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.heading,
          {
            borderColor: isOpen ? "orange" : "#dbdbdb",
          },
        ]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <View style={styles.container}>
          <Text
            style={{
              marginRight: "auto",
              color: renderColor,
              textTransform: "capitalize",
            }}
          >
            {feature || "select feature"}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={renderColor}
          />
        </View>
      </TouchableOpacity>
      {errorMessages && <Text style={{ color: "red" }}>{errorMessages}</Text>}
      {isOpen && (
        <View style={styles.popupContainer}>
          <View style={styles.popupWrapper}>
            <TouchableOpacity
              onPress={() => {
                setFeature(ApprovalMatrixType.Default);
                setIsOpen(false);
              }}
            >
              <Text style={styles.textPopup}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFeature(ApprovalMatrixType.TransferOnline);
                setIsOpen(false);
              }}
            >
              <Text style={styles.textPopup}>Transfer Online</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", flex: 1, paddingRight: 6 },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  popupContainer: {
    position: "absolute",
    top: 56,
    left: 0,
    width: "100%",
  },
  popupWrapper: {
    backgroundColor: "white",
    marginHorizontal: "auto",
    padding: 16,
    borderRadius: 16,
    width: "99%",
    gap: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android shadow (elevation)
    elevation: 5,
  },
  textPopup: {
    fontSize: 16,
  },
  content: {
    flexDirection: "column",
    gap: 10,
  },
});
