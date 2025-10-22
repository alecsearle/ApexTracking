import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const PERMISSIONS_STORAGE_KEY = "@apex_tracking_permissions";

const UserPermissions = () => {
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

  // Load permissions from AsyncStorage on mount
  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const storedPermissions = await AsyncStorage.getItem(PERMISSIONS_STORAGE_KEY);
      if (storedPermissions) {
        setPermissions(JSON.parse(storedPermissions));
      }
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  };

  const togglePermission = async (key: keyof typeof permissions) => {
    const updatedPermissions = { ...permissions, [key]: !permissions[key] };
    setPermissions(updatedPermissions);
    try {
      await AsyncStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(updatedPermissions));
    } catch (error) {
      console.error("Error saving permissions:", error);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {userRole === "admin" ? "Admin Permissions" : "Employee Permissions"}
      </Text>
      <View style={styles.card}>
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <SymbolView name="plus.circle" tintColor="#666" size={20} />
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
            <SymbolView name="pencil" tintColor="#666" size={20} />
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
            <SymbolView name="trash" tintColor="#666" size={20} />
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
            <SymbolView name="chart.bar" tintColor="#666" size={20} />
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
            <SymbolView name="person.2" tintColor="#666" size={20} />
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
            <SymbolView name="arrow.down.circle" tintColor="#666" size={20} />
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
  );
};

export default UserPermissions;

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
});
