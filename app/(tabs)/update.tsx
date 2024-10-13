import { CollapsibleInput } from "@/components/CollapsibleInput";
import LabelInput from "@/components/LabelInput";
import { IMatrix, InputType } from "@/interface/common";
import { useMatrixStore } from "@/store";
import { showToast } from "@/utils/toast";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const updateScreen = () => {
  const matrix = useLocalSearchParams() as unknown as IMatrix;
  const [data, setData] = useState<IMatrix>(matrix);
  const { updateMatrix, deleteMatrix } = useMatrixStore();
  const [errors, setErrors] = useState({
    minimum: "",
    maximum: "",
  });
  const isFormValid = () => {
    return (
      data.alias &&
      data.feature &&
      data.minimum &&
      data.maximum &&
      data.number_of_approval
    );
  };
  const handleValidation = () => {
    let valid = true;
    const newErrors = {
      minimum: "",
      maximum: "",
    };

    if (data?.minimum && data?.maximum) {
      if (Number(data.minimum) > Number(data.maximum)) {
        newErrors.minimum = "Minimum must be less than Maximum";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      updateMatrix(data);
      showToast("Approval Matrix Updated");
      router.push("./");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Approval Matrix Info</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.form1}>
              <LabelInput
                type={InputType.Text}
                value={data?.alias || ""}
                setValue={(text) => setData({ ...data, alias: text })}
                label="Approval Matrix Alias"
                placeholder="Input Matrix Name"
              />

              <View style={styles.featureWrapper}>
                <Text style={styles.textLabel}>Feature</Text>
                <CollapsibleInput
                  feature={data?.feature}
                  setFeature={(f) => setData({ ...data, feature: f })}
                />
              </View>
            </View>

            <View style={styles.form2}>
              <LabelInput
                type={InputType.Number}
                value={data?.minimum}
                setValue={(text) => setData({ ...data, minimum: text as any })}
                label="Range of Approval (Minimum)"
                placeholder="Input Text Here"
                errorMessages={errors.minimum}
              />
              <LabelInput
                type={InputType.Number}
                value={data?.maximum}
                setValue={(text) => setData({ ...data, maximum: text as any })}
                label="Range of Approval (Maximum)"
                placeholder="Input Text Here"
                errorMessages={errors.maximum}
              />
              <LabelInput
                type={InputType.Number}
                value={data?.number_of_approval}
                setValue={(text) =>
                  setData({ ...data, number_of_approval: text as any })
                }
                label="Number of Approval"
                placeholder="Input Text Here"
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                disabled={!Boolean(isFormValid())}
                onPress={handleSubmit}
                style={styles.button}
              >
                <Text
                  style={[
                    styles.textButton,
                    !Boolean(isFormValid()) && { color: "#dbdbdb" },
                  ]}
                >
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteMatrix(matrix);
                  showToast("Approval Matrix Deleted");
                  router.push("./");
                }}
                style={styles.button}
              >
                <Text style={styles.textButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  body: {
    flex: 1,
    paddingHorizontal: 12,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
    height: 55,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "orange",
    margin: "auto",
  },
  form1: {
    gap: 16,
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  form2: {
    zIndex: -1,
    gap: 16,
    paddingVertical: 16,
  },
  buttonWrapper: { gap: 10, marginTop: 4 },
  button: {
    borderWidth: 1,
    borderColor: "#dbdbdb",
    borderRadius: 14,
    padding: 16,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "700",
    color: "#eb951b",
    textTransform: "uppercase",
    textAlign: "center",
  },
  textLabel: {
    fontSize: 15,
  },
  featureWrapper: {
    gap: 8,
  },
});

export default updateScreen;
