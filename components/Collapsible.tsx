import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ApprovalMatrixType } from "@/interface/common";

export interface CollapsibleProps extends PropsWithChildren {
  title: ApprovalMatrixType;
  addTypes: (title: ApprovalMatrixType) => void;
  removeTypes: (title: ApprovalMatrixType) => void;
}

export function Collapsible({
  children,
  title,
  addTypes,
  removeTypes,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const renderColor = useMemo(() => (isOpen ? "orange" : "black"), [isOpen]);
  const renderColorBorder = useMemo(
    () => (isOpen ? "orange" : "#e1e1e1"),
    [isOpen]
  );

  useEffect(() => {
    if (!isOpen) removeTypes(title);
    else addTypes(title);
  }, [isOpen]);

  return (
    <ThemedView>
      <TouchableOpacity
        style={[
          styles.heading,
          { borderColor: isOpen ? "orange" : "transparent" },
        ]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <View
          style={{
            width: "40%",
            borderRightColor: renderColorBorder,
            borderRightWidth: 1,
            height: 30,
          }}
        >
          <Text
            style={{ color: renderColor, fontSize: 15, marginVertical: "auto" }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1, paddingRight: 20 }}>
          <Text
            style={{ marginRight: "auto", color: renderColor, fontSize: 15 }}
          >
            {title}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={renderColor}
          />
        </View>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: "column",
    gap: 10,
  },
});
