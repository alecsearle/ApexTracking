import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function AllToolsWidget() {
  type ToolProps = {
    id: string;
    name: string;
    model: string;
    serialNumber: string;
    class: string;
    purchaseDate: string;
    status: string;
  };

  const tools = [
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
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Tools</Text>
        <Link href="/Tools">
          <Text style={styles.viewAll}>View All</Text>
        </Link>
      </View>
      <View style={styles.toolsContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {tools.map((tool, index) => (
            <View key={index} style={styles.toolItem}>
              <View style={styles.toolHeader}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: tool.status === "Active" ? "#4CAF50" : "#FFA000" },
                  ]}
                />
                <Text style={styles.toolClass}>{tool.class}</Text>
              </View>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.modelNumber}>Model: {tool.model}</Text>
              <Text style={styles.serialNumber}>SN: {tool.serialNumber}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default AllToolsWidget;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  viewAll: {
    fontSize: 14,
    color: "#d6b588",
    fontWeight: "500",
  },
  toolsContainer: {
    marginTop: 4,
  },
  scrollContent: {
    paddingRight: 16, // Extra padding for last item
    paddingVertical: 4, // Space for shadow
  },
  toolItem: {
    padding: 16,
    width: 200,
    marginLeft: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  toolHeader: {
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
    color: "#333",
    marginBottom: 8,
  },
  modelNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  serialNumber: {
    fontSize: 12,
    color: "#999",
  },
});
