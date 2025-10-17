import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

function AllToolsList() {
  // Get URL params and router
  const params = useLocalSearchParams();
  const router = useRouter();
  type Tool = {
    id: string;
    name: string;
    model: string;
    serialNumber: string;
    class: string;
    purchaseDate: string;
    status: string;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [tools, setTools] = useState<Tool[]>([
    {
      id: "1",
      name: "Tool 1",
      model: "Model A",
      serialNumber: "SN123",
      class: "Class 1",
      purchaseDate: "2022-01-01",
      status: "Active",
    },
    {
      id: "2",
      name: "Tool 2",
      model: "Model B",
      serialNumber: "SN124",
      class: "Class 2",
      purchaseDate: "2022-02-01",
      status: "Inactive",
    },
    {
      id: "3",
      name: "Tool 3",
      model: "Model C",
      serialNumber: "SN125",
      class: "Class 1",
      purchaseDate: "2022-03-01",
      status: "Active",
    },
    {
      id: "4",
      name: "Tool 4",
      model: "Model D",
      serialNumber: "SN126",
      class: "Class 3",
      purchaseDate: "2022-04-01",
      status: "Active",
    },
  ]);

  // Handle new tool data when params exist
  useEffect(() => {
    if (params.name && params.isNew === "true") {
      const newTool = {
        id: (tools.length + 1).toString(),
        name: params.name as string,
        model: params.model as string,
        serialNumber: params.serialNumber as string,
        class: params.class as string,
        purchaseDate: params.purchaseDate as string,
        status: "Active", // Default status for new tools
      };

      setTools((prevTools) => [...prevTools, newTool]);

      // Clear the params by replacing the URL without params
      router.setParams({ isNew: "false" });
    }
  }, [params.isNew]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.toolsContainer}>
        <View style={styles.gridContainer}>
          {tools.map((tool, index) => (
            <Pressable
              key={index}
              style={styles.toolItem}
              onPress={() => {
                setSelectedTool(tool);
                setModalVisible(true);
              }}
            >
              <View style={styles.toolStatus}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: tool.status === "Active" ? "#4CAF50" : "#FFA000" },
                  ]}
                />
                <Text style={styles.toolClass}>{tool.class}</Text>
              </View>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolModel}>{tool.model}</Text>
              <Text style={styles.serialNumber}>SN: {tool.serialNumber}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              {selectedTool && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedTool.name}</Text>
                    <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                      <Ionicons name="close" size={24} color="#666" />
                    </Pressable>
                  </View>

                  <View style={styles.detailRow}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor: selectedTool.status === "Active" ? "#4CAF50" : "#FFA000",
                        },
                      ]}
                    />
                    <Text style={styles.statusText}>{selectedTool.status}</Text>
                  </View>

                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Model:</Text>
                      <Text style={styles.detailValue}>{selectedTool.model}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Serial Number:</Text>
                      <Text style={styles.detailValue}>{selectedTool.serialNumber}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Class:</Text>
                      <Text style={styles.detailValue}>{selectedTool.class}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Purchase Date:</Text>
                      <Text style={styles.detailValue}>
                        {new Date(selectedTool.purchaseDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>

                  <Pressable style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Tool</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  toolsContainer: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toolItem: {
    width: "48%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  toolStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  toolClass: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  toolName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  toolModel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  serialNumber: {
    fontSize: 12,
    color: "#999",
  },
  addToolItem: {
    width: "100%",
    height: 70,
    marginBottom: 20,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#d6b588",
    backgroundColor: "#faf5e6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addToolContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addToolText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#d6b588",
    textAlign: "center",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 8,
  },
  detailSection: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    width: 120,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#d6b588",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AllToolsList;
