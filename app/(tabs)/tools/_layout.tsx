import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable } from "react-native";

export default function ToolsLayout() {
  const brandColor = "#d6b588";

  return (
    <Stack
      screenOptions={{
        headerTintColor: brandColor, // <-- makes back arrow + text tan
        headerTitleStyle: {
          color: "#000", // keep title readable in black
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
              onPress={() => console.log("Radio wave icon pressed")}
              style={{ marginRight: 15 }}
            >
              <SymbolView
                name="iphone.radiowaves.left.and.right"
                tintColor={brandColor}
                type="hierarchical"
                size={20}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
