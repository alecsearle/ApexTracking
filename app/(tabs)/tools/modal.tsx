import AddToolForm from "@/components/AddToolForm";
import { StyleSheet, View } from "react-native";

export default function modal() {
  return (
    <View style={styles.container}>
      <AddToolForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
