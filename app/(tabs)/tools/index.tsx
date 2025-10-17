import AddToolButton from "@/components/AddToolButton";
import AllToolsList from "@/components/AllToolsList";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ToolsScreen() {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/tools/modal" style={styles.link}>
        <AddToolButton />
      </Link>
      <AllToolsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
    color: "#d6b588",
  },
});
