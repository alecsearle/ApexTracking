import DateTimePicker from "@react-native-community/datetimepicker";
import DocumentPickerComponent from "./DocumentPickerComponent";

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

type EditToolFormProps = {
  tool: {
    id: string;
    name: string;
    model: string;
    serialNumber: string;
    class: string;
    purchaseDate: string;
    status: string;
  };
  onSave: (updatedTool: any) => void;
  onCancel: () => void;
};

const EditToolForm = ({ tool, onSave, onCancel }: EditToolFormProps) => {
  const [formData, setFormData] = useState({
    name: tool.name,
    model: tool.model,
    serialNumber: tool.serialNumber,
    class: tool.class,
    purchaseDate: new Date(tool.purchaseDate),
    status: tool.status,
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
      const updatedTool = {
        ...tool,
        ...formData,
        purchaseDate: formData.purchaseDate.toISOString(),
      };
      onSave(updatedTool);
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
              <Text style={styles.label}>Status</Text>
              <View style={styles.statusContainer}>
                <Pressable
                  style={[
                    styles.statusButton,
                    formData.status === "Active" && styles.statusButtonActive,
                  ]}
                  onPress={() => setFormData((prev) => ({ ...prev, status: "Active" }))}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      formData.status === "Active" && styles.statusButtonTextActive,
                    ]}
                  >
                    Active
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.statusButton,
                    formData.status === "Inactive" && styles.statusButtonInactive,
                  ]}
                  onPress={() => setFormData((prev) => ({ ...prev, status: "Inactive" }))}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      formData.status === "Inactive" && styles.statusButtonTextInactive,
                    ]}
                  >
                    Inactive
                  </Text>
                </Pressable>
              </View>
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

            <View style={styles.buttonContainer}>
              <Pressable style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Save Changes</Text>
              </Pressable>
            </View>
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
    paddingRight: 16,
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
  statusContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  statusButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  statusButtonInactive: {
    backgroundColor: "#FFA000",
    borderColor: "#FFA000",
  },
  statusButtonText: {
    color: "#666",
    fontWeight: "500",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  statusButtonTextInactive: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d6b588",
  },
  cancelButtonText: {
    color: "#d6b588",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#d6b588",
    paddingVertical: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditToolForm;
