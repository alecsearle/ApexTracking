import { SymbolView } from "expo-symbols";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const DataManagement = () => {
  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear Data",
          style: "destructive",
          onPress: () => {
            // Handle data clearing logic here
            Alert.alert("Success", "All data has been cleared.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Data Management</Text>
      <View style={styles.card}>
        <Pressable style={styles.actionItem}>
          <View style={styles.actionItemContent}>
            <SymbolView name="icloud.and.arrow.up" tintColor="#666" size={20} />
            <Text style={styles.actionItemText}>Backup Data</Text>
          </View>
          <SymbolView name="chevron.forward" tintColor="#ccc" size={20} />
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.actionItem}>
          <View style={styles.actionItemContent}>
            <SymbolView name="icloud.and.arrow.down" tintColor="#666" size={20} />
            <Text style={styles.actionItemText}>Restore Data</Text>
          </View>
          <SymbolView name="chevron.forward" tintColor="#ccc" size={20} />
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.actionItem} onPress={handleClearData}>
          <View style={styles.actionItemContent}>
            <SymbolView name="trash" tintColor="#ff3b30" size={20} />
            <Text style={[styles.actionItemText, styles.dangerText]}>Clear All Data</Text>
          </View>
          <SymbolView name="chevron.forward" tintColor="#ccc" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default DataManagement;

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  actionItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionItemText: {
    fontSize: 16,
    color: "#333",
  },
  dangerText: {
    color: "#ff3b30",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },
});
