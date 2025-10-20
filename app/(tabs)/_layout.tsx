import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import { Platform } from "react-native";

const brandTint = "#d6b588";
const inactiveTint = "#8E8E93";

function TabBarIcon({
  nameIOS,
  nameAndroid,
  focused,
}: {
  nameIOS: SFSymbol;
  nameAndroid: string;
  focused: boolean;
}) {
  const color = focused ? brandTint : inactiveTint;

  if (Platform.OS === "ios") {
    return (
      <SymbolView
        name={nameIOS}
        type={focused ? "hierarchical" : "monochrome"}
        tintColor={color}
        size={22}
      />
    );
  }

  return <Ionicons name={nameAndroid as any} size={22} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brandTint,
        tabBarInactiveTintColor: inactiveTint,

        // 🔹 Make the tab bar glassy (iOS only)
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              tint="light" // can be "light", "dark", or "extraLight"
              intensity={80} // adjust blur strength (60–100 looks great)
              style={{ flex: 1 }}
            />
          ) : null,

        // 🔹 Make tab bar translucent
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.OS === "ios" ? "rgba(255,255,255,0.3)" : "#fff",
          borderTopWidth: 0,
          elevation: 0,
          backdropFilter: "blur(10px)", // web only, ignored on native
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon nameIOS="house.fill" nameAndroid="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              nameIOS="wrench.and.screwdriver.fill"
              nameAndroid="construct"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon nameIOS="gearshape.fill" nameAndroid="settings" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
