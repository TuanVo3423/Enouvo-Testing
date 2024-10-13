import { Collapsible } from "@/components/Collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { ApprovalMatrixType } from "@/interface/common";
import { useMatrixStore } from "@/store";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [types, setTypes] = useState<Array<ApprovalMatrixType>>([]);
  const { matrixes } = useMatrixStore();

  const addTypes = (title: ApprovalMatrixType) => {
    setTypes([...types, title]);
  };
  const removeTypes = (title: ApprovalMatrixType) => {
    setTypes(types.filter((type) => type !== title));
  };
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Approval Matrix</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.headerBody}>
            <TouchableOpacity
              onPress={() => {
                router.push("./create");
              }}
              style={styles.createButton}
            >
              <AntDesign name="pluscircle" size={20} color="white" />
              <Text style={styles.createButtonText}>Tambah New Matrix</Text>
            </TouchableOpacity>
          </View>
          <Collapsible
            addTypes={addTypes}
            removeTypes={removeTypes}
            title={ApprovalMatrixType.Default}
          />
          <Collapsible
            addTypes={addTypes}
            removeTypes={removeTypes}
            title={ApprovalMatrixType.TransferOnline}
          />
          <ScrollView>
            <View style={{ flexDirection: "column", gap: 10 }}>
              {matrixes
                .filter((matrix) =>
                  types.includes(matrix.feature as ApprovalMatrixType)
                )
                .sort(
                  (a, b) =>
                    (a.number_of_approval as number) -
                    (b.number_of_approval as number)
                )
                .map((matrix) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: `/update`,
                        params: { ...matrix },
                      })
                    }
                    style={styles.item}
                    key={matrix.id}
                  >
                    <View style={styles.itemWrapper}>
                      <View>
                        <Text style={{ fontSize: 12 }}>
                          Range Limit of Approval
                        </Text>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.textLabel}>Minimum IDR</Text>
                        <Text style={styles.textLabel}>Maximum IDR</Text>
                      </View>
                      <View>
                        <Text style={styles.textLabel}>{matrix.minimum}</Text>
                        <Text style={styles.textLabel}>{matrix.maximum}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 10,
                      }}
                    >
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ fontSize: 12 }}>Number of Approval</Text>
                        <Text
                          style={{
                            fontSize: 12,
                            marginLeft: "auto",
                            color: "#22268f",
                          }}
                        >
                          {matrix.number_of_approval}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#eb951b",
  },
  container: {
    flex: 1,
    backgroundColor: "#eb951b",
  },
  body: {
    overflow: "hidden",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    gap: 20,
  },
  header: {
    marginHorizontal: "auto",
    height: 80,
  },
  headerBody: {
    height: 60,
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
  createButton: {
    flexDirection: "row",
    backgroundColor: "#22268f",
    gap: 10,
    alignSelf: "center",
    marginLeft: "auto",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
  },
  item: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e1e1e1",
  },
  itemWrapper: {
    flexDirection: "row",
    borderBottomColor: "#cdcccf",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  textLabel: { fontSize: 12, color: "#22268f" },
});
