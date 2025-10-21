import { Ionicons } from "@expo/vector-icons";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";

const PurchaseNfcTags = () => {
  const handleBuyNFCTags = () => {
    Alert.alert(
      "Purchase NFC Tags",
      "You will be redirected to our NFC tag supplier. Would you like to continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            // Replace with your actual NFC tag supplier URL
            Linking.openURL("https://www.amazon.com/s?k=nfc+tags");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>NFC Tags</Text>
      <Pressable style={styles.actionButton} onPress={handleBuyNFCTags}>
        <View style={styles.actionButtonContent}>
          <Ionicons name="pricetag" size={24} color="#d6b588" />
          <View style={styles.actionButtonText}>
            <Text style={styles.actionButtonTitle}>Purchase NFC Tags</Text>
            <Text style={styles.actionButtonSubtitle}>Buy compatible NFC tags for your tools</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ccc" />
      </Pressable>
    </View>
  );
};

export default PurchaseNfcTags;

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
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  actionButtonText: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
