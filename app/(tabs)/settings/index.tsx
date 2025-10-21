import { useUser } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function SettingsScreen() {
  // Use global user context
  const { userRole, setUserRole, isAdmin } = useUser();

  // Permission states
  const [permissions, setPermissions] = useState({
    canAddTools: true,
    canEditTools: true,
    canDeleteTools: true,
    canViewReports: true,
    canManageUsers: true,
    canExportData: false,
  });

  // App settings
  const [appSettings, setAppSettings] = useState({
    notifications: true,
    autoSync: true,
    darkMode: false,
  });

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

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAppSetting = (key: keyof typeof appSettings) => {
    setAppSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Role Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Role</Text>
        <View style={styles.roleContainer}>
          <Pressable
            style={[styles.roleButton, userRole === "admin" && styles.roleButtonActive]}
            onPress={() => setUserRole("admin")}
          >
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={userRole === "admin" ? "#fff" : "#d6b588"}
            />
            <Text style={[styles.roleText, userRole === "admin" && styles.roleTextActive]}>
              Admin
            </Text>
          </Pressable>
          <Pressable
            style={[styles.roleButton, userRole === "employee" && styles.roleButtonActive]}
            onPress={() => setUserRole("employee")}
          >
            <Ionicons
              name="person"
              size={24}
              color={userRole === "employee" ? "#fff" : "#d6b588"}
            />
            <Text style={[styles.roleText, userRole === "employee" && styles.roleTextActive]}>
              Employee
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Permissions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {userRole === "admin" ? "Admin Permissions" : "Employee Permissions"}
        </Text>
        <View style={styles.card}>
          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="add-circle-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Add Tools</Text>
            </View>
            <Switch
              value={permissions.canAddTools}
              onValueChange={() => togglePermission("canAddTools")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="create-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Edit Tools</Text>
            </View>
            <Switch
              value={permissions.canEditTools}
              onValueChange={() => togglePermission("canEditTools")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="trash-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Delete Tools</Text>
            </View>
            <Switch
              value={permissions.canDeleteTools}
              onValueChange={() => togglePermission("canDeleteTools")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="bar-chart-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>View Reports</Text>
            </View>
            <Switch
              value={permissions.canViewReports}
              onValueChange={() => togglePermission("canViewReports")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="people-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Manage Users</Text>
            </View>
            <Switch
              value={permissions.canManageUsers}
              onValueChange={() => togglePermission("canManageUsers")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
              disabled={userRole === "employee"}
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="download-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Export Data</Text>
            </View>
            <Switch
              value={permissions.canExportData}
              onValueChange={() => togglePermission("canExportData")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.card}>
          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="notifications-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Notifications</Text>
            </View>
            <Switch
              value={appSettings.notifications}
              onValueChange={() => toggleAppSetting("notifications")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="sync-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Auto Sync</Text>
            </View>
            <Switch
              value={appSettings.autoSync}
              onValueChange={() => toggleAppSetting("autoSync")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionInfo}>
              <Ionicons name="moon-outline" size={20} color="#666" />
              <Text style={styles.permissionText}>Dark Mode</Text>
            </View>
            <Switch
              value={appSettings.darkMode}
              onValueChange={() => toggleAppSetting("darkMode")}
              trackColor={{ false: "#ccc", true: "#d6b588" }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* NFC Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NFC Tags</Text>
        <Pressable style={styles.actionButton} onPress={handleBuyNFCTags}>
          <View style={styles.actionButtonContent}>
            <Ionicons name="pricetag" size={24} color="#d6b588" />
            <View style={styles.actionButtonText}>
              <Text style={styles.actionButtonTitle}>Purchase NFC Tags</Text>
              <Text style={styles.actionButtonSubtitle}>
                Buy compatible NFC tags for your tools
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </Pressable>
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <View style={styles.card}>
          <Pressable style={styles.actionItem}>
            <View style={styles.actionItemContent}>
              <Ionicons name="cloud-upload-outline" size={20} color="#666" />
              <Text style={styles.actionItemText}>Backup Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.actionItem}>
            <View style={styles.actionItemContent}>
              <Ionicons name="cloud-download-outline" size={20} color="#666" />
              <Text style={styles.actionItemText}>Restore Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.actionItem} onPress={handleClearData}>
            <View style={styles.actionItemContent}>
              <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              <Text style={[styles.actionItemText, styles.dangerText]}>Clear All Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2025.10.19</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  roleContainer: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d6b588",
    gap: 8,
  },
  roleButtonActive: {
    backgroundColor: "#d6b588",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d6b588",
  },
  roleTextActive: {
    color: "#fff",
  },
  permissionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  permissionInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  permissionText: {
    fontSize: 16,
    color: "#333",
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  bottomPadding: {
    height: 40,
  },
});
