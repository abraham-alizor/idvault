import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface FormTextInputProps extends TextInputProps {
  containerStyle?: object;
  inputStyle?: object;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, inputStyle]}
      placeholderTextColor="#A0A0A0"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333333",
  },
});

export default FormTextInput;
