import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { styles } from "@/styles/auth-style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Auth with Google only
  const handleGoogleAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });

        // ✅ Save user details after successful sign-in
        setTimeout(async () => {
          if (user) {
            const userData = {
              id: user.id,
              fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
              primaryEmailAddress:
                user.primaryEmailAddress?.emailAddress ?? null,
              imageUrl: user.imageUrl ?? null,
            };

            console.log(
              "📦 Clerk User Details:\n",
              JSON.stringify(userData, null, 2)
            );

            try {
              const response = await fetch(
                "https://pricepick-1032723282466.us-central1.run.app/app/saveUser",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(userData),
                }
              );

              if (!response.ok) {
                throw new Error(
                  `❌ API request failed with status ${response.status}`
                );
              }

              console.log("✅ User saved to API:", userData);
              await AsyncStorage.setItem(
                "cachedUser",
                JSON.stringify(userData)
              );
              console.log("💾 User cached successfully");
            } catch (error) {
              console.error("🚨 Error saving user details:", error);
            }
          } else {
            console.warn(
              "⚠️ Clerk user not available immediately after sign-in"
            );
          }

          router.replace("/tabs");
        }, 1000); // slight delay to ensure Clerk updates `user`
      }
    } catch (error) {
      console.log("Google OAuth-error: ", error);
    }
  };

  // Show loading screen while Clerk is loading
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.logText}>Loading user info...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <Image
          source={require("@/assets/images/AppLogo.png")}
          style={styles.logo}
        />
      </View>

      {/* Google Sign-In Button */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleAuth}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.logText}>
        By continuing, you agree to our Terms and Privacy Policy.
      </Text>
    </View>
  );
}
