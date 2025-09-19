import { StyleSheet, Text, View } from "react-native";

function StatsSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview</Text>
      <View style={styles.statsBox}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Active Tools</Text>
          </View>
          <View style={[styles.statItem, styles.statItemBorder]}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>All Tools</Text>
          </View>
        </View>
        <View style={[styles.statsRow, styles.statsRowBottom]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Job Sites</Text>
          </View>
          <View style={[styles.statItem, styles.statItemBorder]}>
            <Text style={[styles.statNumber, styles.maintenanceNumber]}>1</Text>
            <Text style={styles.statLabel}>Maintenance Due</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default StatsSection;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  statsBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statsRowBottom: {
    borderBottomWidth: 0,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#f0f0f0",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  maintenanceNumber: {
    color: "#d6b588", // Using your theme color
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
