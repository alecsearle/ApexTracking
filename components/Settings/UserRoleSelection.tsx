import { useUser } from "@/contexts/UserContext";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

const UserRoleSelection = () => {
  // Use global user context

  const { userRole, setUserRole, isAdmin } = useUser();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>User Role</Text>
      <View style={styles.roleContainer}>
        <Pressable
          style={[styles.roleButton, userRole === "admin" && styles.roleButtonActive]}
          onPress={() => setUserRole("admin")}
        >
          <SymbolView
            name="checkmark.shield.fill"
            tintColor={userRole === "admin" ? "#fff" : "#d6b588"}
            size={24}
          />
          <Text style={[styles.roleText, userRole === "admin" && styles.roleTextActive]}>
            Admin
          </Text>
        </Pressable>
        <Pressable
          style={[styles.roleButton, userRole === "employee" && styles.roleButtonActive]}
          onPress={() => setUserRole("employee")}
        >
          <SymbolView
            name="person.fill"
            tintColor={userRole === "employee" ? "#fff" : "#d6b588"}
            size={24}
          />
          <Text style={[styles.roleText, userRole === "employee" && styles.roleTextActive]}>
            Employee
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserRoleSelection;

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
});
