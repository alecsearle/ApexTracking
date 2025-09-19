import { Stack, usePathname } from "expo-router";

export default function Layout() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Stack screenOptions={{ animation: pathname.startsWith("/Tools") ? "default" : "none" }}>
      <Stack.Screen name="index" options={{ title: "All Tools" }} />
      <Stack.Screen name="AddTool" options={{ title: "Add Tool" }} />
    </Stack>
  );
}
