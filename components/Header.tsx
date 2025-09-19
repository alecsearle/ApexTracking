import { StyleSheet, Text, View } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTextSmall}>Welcome to</Text>
      <Text style={styles.headerTextLarge}>Apex Tracking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "flex-start",
  },
  headerTextSmall: {
    fontSize: 16,
  },
  headerTextLarge: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Header;
