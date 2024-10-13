import { InputType } from "@/interface/common";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export interface ILabelInputProps {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  setValue: (value: string) => void;
  errorMessages?: string;
  type: InputType;
}
const LabelInput = (props: ILabelInputProps) => {
  const { label, setValue, value, placeholder, errorMessages, type } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput
        keyboardType={type === InputType.Number ? "numeric" : "default"}
        value={value?.toString()}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectionColor={"#eb951b"}
        style={[
          styles.input,
          {
            borderColor: isFocused ? "#eb951b" : "#dbdbdb",
          },
        ]}
      />
      {errorMessages && <Text style={styles.textError}>{errorMessages}</Text>}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: { flexDirection: "column", gap: 8 },
  textLabel: { fontSize: 15 },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
  },
  textError: { color: "red" },
});

export default LabelInput;
