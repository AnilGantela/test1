import { COLORS } from "@/constants/theme";
import { Stack } from "expo-router";
// Adjust the import path to where your COLORS object is located

export default function ProfileStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.SECONDARY, // Set background color
        },
        headerTintColor: COLORS.WHITE,
      }}
    >
      {/* Hide header for the Profile index screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Orders screen */}
      <Stack.Screen
        name="orders"
        options={{
          title: "",
          // Set text color to white
        }}
      />

      {/* Support screen */}
      <Stack.Screen
        name="support"
        options={{
          title: "Support",
          headerStyle: {
            backgroundColor: COLORS.SECONDARY, // Set background color
          },
          headerTintColor: "#FFFFFF", // Set text color to white
        }}
      />

      {/* Razorpay Payment screen with back arrow */}
      <Stack.Screen
        name="OrderPayment"
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.SECONDARY, // Set background color
          },
          headerTintColor: "#FFFFFF", // Set text color to white
          headerShown: true, // Ensure header is shown for this screen
        }}
      />
    </Stack>
  );
}
