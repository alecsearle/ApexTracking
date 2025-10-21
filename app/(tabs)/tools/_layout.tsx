import showNfcAlert from "@/components/NfcUtil/AlertNfcUse";
import { useUser } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable } from "react-native";

export default function ToolsLayout() {
  const brandColor = "#d6b588";
  const { userRole } = useUser();

  return (
    <Stack
      screenOptions={{
        headerTintColor: brandColor,
        headerTitleStyle: {
          color: "#000",
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Tools",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerTitle: "Add Tool",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Tool Details",
          headerShown: true,
          headerBackTitle: "Tools",
          headerRight: () => (
            <Pressable
              onPress={() => {
                showNfcAlert(userRole);
              }}
              style={{ marginRight: 15 }}
            >
              <SymbolView
                name="iphone.radiowaves.left.and.right"
                tintColor={brandColor}
                type="hierarchical"
                size={24}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
