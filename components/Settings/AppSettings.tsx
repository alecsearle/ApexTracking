import AsyncStorage from "@react-native-async-storage/async-storage";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const APP_SETTINGS_STORAGE_KEY = "@apex_tracking_app_settings";

const AppSettings = () => {
  // App settings
  const [appSettings, setAppSettings] = useState({
    notifications: true,
    autoSync: true,
    darkMode: false,
  });

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(APP_SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        setAppSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Error loading app settings:", error);
    }
  };

  const toggleAppSetting = async (key: keyof typeof appSettings) => {
    const updatedSettings = { ...appSettings, [key]: !appSettings[key] };
    setAppSettings(updatedSettings);
    try {
      await AsyncStorage.setItem(APP_SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Error saving app settings:", error);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>App Settings</Text>
      <View style={styles.card}>
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <SymbolView name="bell" tintColor="#666" size={20} />
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
            <SymbolView name="arrow.triangle.2.circlepath" tintColor="#666" size={20} />
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
            <SymbolView name="moon" tintColor="#666" size={20} />
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
  );
};

export default AppSettings;

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
