import EditToolForm from "@/components/EditToolForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ToolDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [toolData, setToolData] = useState({
    id: params.id as string,
    name: params.name as string,
    model: params.model as string,
    serialNumber: params.serialNumber as string,
    class: params.class as string,
    purchaseDate: params.purchaseDate as string,
    status: params.status as string,
  });

  // Parse the tool data from params
  const tool = toolData;

  const handleSave = (updatedTool: any) => {
    setToolData(updatedTool);
    setModalVisible(false);
    // Here you would typically also update your backend/storage
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{tool.name}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: tool.status === "Active" ? "#4CAF50" : "#FFA000",
              },
            ]}
          />
          <Text style={styles.statusText}>{tool.status}</Text>
        </View>

        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{tool.model}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Serial Number:</Text>
            <Text style={styles.detailValue}>{tool.serialNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Class:</Text>
            <Text style={styles.detailValue}>{tool.class}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Purchase Date:</Text>
            <Text style={styles.detailValue}>
              {new Date(tool.purchaseDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <Pressable style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit Tool</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Tool</Text>
          </View>
          <EditToolForm tool={tool} onSave={handleSave} onCancel={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  detailSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    width: 130,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#d6b588",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalHeader: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
