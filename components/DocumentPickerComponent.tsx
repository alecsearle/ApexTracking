import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DocumentPickerComponent = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [uri, setUri] = useState("");
  const pickDocument = async () => {
    const response = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!response.canceled) {
      const { name, size, uri } = response.assets[0];
      setName(name);
      setSize(size !== undefined ? size.toString() : "");
      setUri(uri);
    }

    console.log(response);
  };

  const formatFileSize = (bytes: string) => {
    if (!bytes) return "";
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <View style={styles.container}>
      {!uri ? (
        // Compact upload area when no file selected
        <Pressable onPress={pickDocument} style={styles.compactUploadArea}>
          <View style={styles.compactUploadContent}>
            <Text style={styles.compactUploadIcon}>
              <AntDesign name="file-pdf" size={24} color="black" />
            </Text>
            <View style={styles.compactUploadText}>
              <Text style={styles.compactUploadTitle}>Upload Maintenance Manual</Text>
              <Text style={styles.compactUploadSubtitle}>Tap to select PDF</Text>
            </View>
          </View>
        </Pressable>
      ) : (
        // File selected state - more detailed view
        <View style={styles.selectedFileArea}>
          <View style={styles.selectedFileHeader}>
            <Text style={styles.selectedFileTitle}>Document Upload</Text>
            <Pressable onPress={pickDocument} style={styles.changeFileButton}>
              <Text style={styles.changeFileText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.fileInfo}>
            <View style={styles.fileIconContainer}>
              <FontAwesome6 name="file-pdf" size={24} color="black" />
            </View>
            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.fileSize}>{formatFileSize(size)}</Text>
            </View>
            <View style={styles.fileStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Ready</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  // Compact upload area - much smaller when no file selected
  compactUploadArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  compactUploadContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  compactUploadIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  compactUploadText: {
    flex: 1,
  },
  compactUploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  compactUploadSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  // Selected file area - more detailed when file is chosen
  selectedFileArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedFileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedFileTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  changeFileButton: {
    backgroundColor: "#d6b588",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeFileText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  fileIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fileIcon: {
    fontSize: 16,
  },
  fileDetails: {
    flex: 1,
    marginRight: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
  },
  fileStatus: {
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginBottom: 3,
  },
  statusText: {
    fontSize: 10,
    color: "#4CAF50",
    fontWeight: "500",
  },
});

export default DocumentPickerComponent;
