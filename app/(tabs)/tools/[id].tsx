import EditToolForm from "@/components/EditToolForm";
import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const TOOLS_STORAGE_KEY = "@apex_tracking_tools";

export default function ToolDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { isAdmin } = useUser();

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

  const handleSave = async (updatedTool: any) => {
    setToolData(updatedTool);
    setModalVisible(false);

    // Update tool in AsyncStorage
    try {
      const storedTools = await AsyncStorage.getItem(TOOLS_STORAGE_KEY);
      if (storedTools) {
        const tools = JSON.parse(storedTools);
        const updatedTools = tools.map((t: any) => (t.id === updatedTool.id ? updatedTool : t));
        await AsyncStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(updatedTools));
      }
    } catch (error) {
      console.error("Error updating tool:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Tool",
      `Are you sure you want to delete "${tool.name}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const storedTools = await AsyncStorage.getItem(TOOLS_STORAGE_KEY);
              if (storedTools) {
                const tools = JSON.parse(storedTools);
                const updatedTools = tools.filter((t: any) => t.id !== tool.id);
                await AsyncStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(updatedTools));
                Alert.alert("Success", "Tool deleted successfully.");
                router.back();
              }
            } catch (error) {
              console.error("Error deleting tool:", error);
              Alert.alert("Error", "Failed to delete tool.");
            }
          },
        },
      ]
    );
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

        {isAdmin() && (
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Tool</Text>
          </Pressable>
        )}
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
  deleteButton: {
    backgroundColor: "#ff3b30",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButtonText: {
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
