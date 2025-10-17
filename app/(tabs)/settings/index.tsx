import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab [SETTINGS]</Text>
      <Text>Create Admin / Employee permissions</Text>
      {/* Admin Permissions */}
      {/* Employee Permissions */}
      {/* Buy NFC Tags */}
      {/* Clear Data */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
