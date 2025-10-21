import AboutApp from "@/components/Settings/AboutApp";
import AppSettings from "@/components/Settings/AppSettings";
import DataManagement from "@/components/Settings/DataManagement";
import PurchaseNfcTags from "@/components/Settings/PurchaseNfcTags";
import UserPermissions from "@/components/Settings/UserPermissions";
import UserRoleSelection from "@/components/Settings/UserRoleSelection";
import { ScrollView, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <UserRoleSelection />
      <UserPermissions />
      <AppSettings />
      <PurchaseNfcTags />
      <DataManagement />
      <AboutApp />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
