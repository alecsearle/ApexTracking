import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AllTools from "../../components/AllTools";

export default function Tools() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AllTools />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    // Remove padding as it's handled by AllTools
  },
});
