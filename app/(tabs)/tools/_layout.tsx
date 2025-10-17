import { Stack } from "expo-router";

export default function ToolsLayout() {
  return (
    <Stack>
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
    </Stack>
  );
}
