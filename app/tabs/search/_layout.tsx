import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchStackLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* Hide header for /search/index */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[productId]"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0000c5", // Background color
          },
          headerTintColor: "#ffffff", // Text and icon color
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
