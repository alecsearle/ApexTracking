import { Pressable, StyleSheet, Text } from "react-native";

function FloatingButton() {
  return (
    <Pressable style={styles.button} onPress={() => console.log("Button Pressed")}>
      <Text style={styles.buttonText}>+</Text>
    </Pressable>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 30,
  },
});
