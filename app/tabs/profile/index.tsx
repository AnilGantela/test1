import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/profile-styles";

interface SearchItem {
  query: string;
  searchCount: number;
}

const ProfileDetails: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const [searches, setSearches] = useState<SearchItem[]>([]);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("🧹 User signed out.");
      router.replace("/");
    } catch (error) {
      console.error("🚨 Error logging out:", error);
      Alert.alert("Logout failed", "Please try again.");
    }
  };

  const fetchUserSearches = async (userId: string) => {
    try {
      const response = await fetch(
        `https://pricepick-1032723282466.us-central1.run.app/app/user/${userId}/searches`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch searches.");
      }

      console.log("📊 Searches fetched:", data);
      setSearches(data.searches || []);
    } catch (error) {
      console.error("❌ Error fetching searches:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserSearches(user.id);
    }
  }, [isSignedIn, user]);

  if (!user || !isSignedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>User not signed in.</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text
            style={[styles.loadingText, { color: "#3498db", marginTop: 10 }]}
          >
            Go to Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileRow}>
          <Image
            source={{
              uri: user.imageUrl || "https://via.placeholder.com/100?text=User",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>
              {`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
            </Text>
            <Text style={styles.email}>
              {user.primaryEmailAddress?.emailAddress ?? "No email"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Recent Searches</Text>

        {searches.length === 0 ? (
          <Text style={styles.emptyText}>No searches found yet.</Text>
        ) : (
          <FlatList
            data={searches}
            keyExtractor={(item, index) => `${item.query}-${index}`}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.searchItem}>
                <Text style={styles.searchQuery}>{item.query}</Text>
                <Text style={styles.searchCount}>
                  Searched {item.searchCount} time
                  {item.searchCount > 1 ? "s" : ""}
                </Text>
              </View>
            )}
          />
        )}

        {/* Bottom Buttons */}
        <View style={styles.bottomSection}>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#f1c40f" }]}
              onPress={() => router.push("/tabs/profile/orders")}
            >
              <Ionicons name="clipboard" size={32} color="white" />
              <Text style={styles.actionButtonLabel}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#3498db" }]}
              onPress={() => router.push("/tabs/profile/support")}
            >
              <Ionicons name="headset" size={32} color="white" />
              <Text style={styles.actionButtonLabel}>Support</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetails;
