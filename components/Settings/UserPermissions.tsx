import { useUser } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

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

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
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
