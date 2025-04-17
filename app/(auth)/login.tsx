import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { styles } from "@/styles/auth-style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { startSSOFlow } = useSSO();
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [authenticating, setAuthenticating] = useState(false);
  const [sessionCreated, setSessionCreated] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setAuthenticating(true);

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        setSessionCreated(true);
        router.replace("/tabs"); // ✅ Let useEffect handle next part
      }
    } catch (error) {
      console.error("Google OAuth-error: ", error);
      setAuthenticating(false);
    }
  };

  // 🧠 useEffect to wait until user is available
  useEffect(() => {
    if (user && isSignedIn && sessionCreated) {
      console.log("User signed in:");
      router.replace("/tabs");
    }
  }, [isSignedIn, isLoaded, user, sessionCreated]);

  // Show loading screen while waiting for Clerk session to load
  if (!isLoaded || authenticating) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.logText}>
          {authenticating ? "Authenticating..." : "Loading user info..."}
        </Text>
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
