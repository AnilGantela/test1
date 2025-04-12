import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";

export default function Index() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const pathname = usePathname(); // 👈 better than useSegments
  const router = useRouter();

  useEffect(() => {
    if (!authLoaded || !userLoaded) return;

    const inAuthGroup = pathname?.startsWith("/(auth)");
    const hasCachedUser = !!user;

    console.log("📍 Pathname:", pathname);
    console.log("🔁 Redirect Check ->", {
      isSignedIn,
      hasCachedUser,
      inAuthGroup,
    });

    requestAnimationFrame(() => {
      if (!isSignedIn && !hasCachedUser && !inAuthGroup) {
        router.replace("/(auth)/login");
      } else if (
        isSignedIn &&
        hasCachedUser &&
        (inAuthGroup || pathname === "/")
      ) {
        router.replace("/tabs/home");
      }
    });
  }, [authLoaded, userLoaded, isSignedIn, user, pathname]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}
