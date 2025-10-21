import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, View } from "react-native";

export default function AddToolButton() {
  return (
    <View style={styles.wrapper}>
      <Link href="/(tabs)/tools/modal" style={styles.addToolItem} asChild>
        <View style={styles.addToolItem}>
          <View style={styles.addToolContent}>
            <SymbolView
              name="plus.circle"
              tintColor="#d6b588"
              size={24}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.addToolText}>Add Tool</Text>
          </View>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  addToolItem: {
    width: "90%",
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
});
