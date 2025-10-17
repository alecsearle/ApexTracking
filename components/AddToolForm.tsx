import DateTimePicker from "@react-native-community/datetimepicker";
import DocumentPickerComponent from "./DocumentPickerComponent";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Predefined tool classes
const TOOL_CLASSES = [
  "Hand Tools",
  "Power Tools",
  "Measurement Tools",
  "Cutting Tools",
  "Safety Equipment",
];

const AddToolForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    serialNumber: "",
    class: "",
    purchaseDate: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    serialNumber: "",
    class: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      serialNumber: "",
      class: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = "Serial number is required";
      isValid = false;
    }

    if (!formData.class) {
      newErrors.class = "Tool class is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Convert date to string format for URL params
      const params = {
        name: formData.name,
        model: formData.model,
        serialNumber: formData.serialNumber,
        class: formData.class,
        purchaseDate: formData.purchaseDate.toISOString(),
        isNew: "true", // Add flag to indicate new tool
      };

      // Navigate back with params
      router.dismissTo({
        pathname: "/tools",
        params: params,
      });
      // router.back();
      // router.setParams(params);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, purchaseDate: selectedDate }));
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={formData.name}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
                placeholder="Enter tool name"
                placeholderTextColor="#e0e0e0"
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Model</Text>
              <TextInput
                style={styles.input}
                value={formData.model}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, model: text }))}
                placeholder="Enter model number"
                placeholderTextColor="#e0e0e0"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Serial Number</Text>
              <TextInput
                style={[styles.input, errors.serialNumber && styles.inputError]}
                value={formData.serialNumber}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, serialNumber: text }))}
                placeholder="Enter serial number"
                placeholderTextColor="#e0e0e0"
              />
              {errors.serialNumber ? (
                <Text style={styles.errorText}>{errors.serialNumber}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Tool Class</Text>
                <Text style={styles.scrollHint}>Scroll for more →</Text>
              </View>
              <View style={styles.classWrapper}>
                <ScrollView
                  horizontal
                  style={styles.classContainer}
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={styles.classContentContainer}
                >
                  {TOOL_CLASSES.map((className) => (
                    <Pressable
                      key={className}
                      style={[
                        styles.classButton,
                        formData.class === className && styles.classButtonSelected,
                      ]}
                      onPress={() => setFormData((prev) => ({ ...prev, class: className }))}
                    >
                      <Text
                        style={[
                          styles.classButtonText,
                          formData.class === className && styles.classButtonTextSelected,
                        ]}
                      >
                        {className}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
              {errors.class ? <Text style={styles.errorText}>{errors.class}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Purchase Date</Text>
              <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text>{formData.purchaseDate.toLocaleDateString()}</Text>
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={formData.purchaseDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <DocumentPickerComponent />

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Tool</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
  },
  dateButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  scrollHint: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  classWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 8,
  },
  classContainer: {
    flexDirection: "row",
  },
  classContentContainer: {
    paddingRight: 16, // Extra padding to show there's more content
  },
  classButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  classButtonSelected: {
    backgroundColor: "#d6b588",
    borderColor: "#d6b588",
  },
  classButtonText: {
    color: "#666",
  },
  classButtonTextSelected: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#d6b588",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddToolForm;
