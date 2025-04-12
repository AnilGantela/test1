import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      {/* Hide header for the Profile index screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Default header shown for others like orders, support, etc. */}
      <Stack.Screen
        name="orders"
        options={{
          title: "Your Orders",
        }}
      />

      <Stack.Screen
        name="support"
        options={{
          title: "Support",
        }}
      />
    </Stack>
  );
}
