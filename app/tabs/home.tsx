import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/styles/home-style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationScreen from "@/components/LocationScreen";
import AdScreen from "@/components/AdScreen";
import { useUser } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/theme";

const Home = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState(null); // <-- Location state

  const { user, isSignedIn, isLoaded } = useUser();

  // Save user to AsyncStorage and backend
  useEffect(() => {
    const saveUserToStorageAndBackend = async () => {
      if (user && isSignedIn) {
        const userData = {
          id: user.id,
          fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          primaryEmailAddress: user.primaryEmailAddress?.emailAddress ?? null,
          imageUrl: user.imageUrl ?? null,
        };

        await AsyncStorage.setItem(
          "cachedUser",
          JSON.stringify({
            clerkId: userData.id,
            email: userData.primaryEmailAddress,
          })
        );
        console.log("💾 User cached successfully");

        try {
          const response = await fetch(
            "https://pricepick-1032723282466.us-central1.run.app/app/saveUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );

          if (!response.ok) {
            throw new Error(
              `❌ API request failed with status ${response.status}`
            );
          }

          console.log("✅ User details saved to backend successfully.");
        } catch (error) {
          console.error("🚨 Error saving user details to backend:", error);
        }
      }
    };

    if (isLoaded && isSignedIn) {
      saveUserToStorageAndBackend();
    }
  }, [isSignedIn, isLoaded, user]);

  const fetchCityAndProducts = useCallback(async () => {
    try {
      let finalCity = "Mangalagiri";
      const cachedAddressString = await AsyncStorage.getItem("cacheAddress");
      if (cachedAddressString) {
        const cachedAddress = JSON.parse(cachedAddressString);
        if (cachedAddress?.city) {
          finalCity = cachedAddress.city;
          setLocation(cachedAddress); // <-- Set location state
        }
      } else {
        setShowLocationModal(true);
        return;
      }

      const response = await fetch(
        "https://pricepick-1032723282466.us-central1.run.app/user/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: finalCity }),
        }
      );

      const data = await response.json();

      if (data?.products) {
        const grouped = data.products.reduce((acc, product) => {
          const category = product.category || "Others";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductsByCategory(grouped);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCityAndProducts();
  }, [fetchCityAndProducts]);

  const handleLocationSelected = async (location) => {
    await AsyncStorage.setItem("cacheAddress", JSON.stringify(location));
    setShowLocationModal(false);
    setLocation(location); // <-- Update location after selecting
    setLoading(true);
    setProductsByCategory({});
    fetchCityAndProducts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("@/assets/images/AppLogo.png")}
          style={styles.logo}
        />
        {location?.city && (
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-sharp"
              size={20}
              color="red"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.locationText}>{location.city}</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.adContainer}>
              <AdScreen />
            </View>
            <View style={styles.searchBarContainer}>
              <TouchableOpacity
                onPress={() => router.push("./search")}
                style={styles.searchBar}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color={COLORS.PRIMARY}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.searchText}>
                  Search for products, shops...
                </Text>
              </TouchableOpacity>
            </View>

            {Object.entries(productsByCategory).map(
              ([categoryName, products]) => (
                <View key={categoryName} style={styles.productSection}>
                  <Text style={styles.sectionTitle}>{categoryName}</Text>
                  <FlatList
                    data={products}
                    keyExtractor={(item, index) =>
                      item._id || `${item.title}-${item.shopname}-${index}`
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dealCard}
                        onPress={() =>
                          router.replace(`/tabs/search/${item._id}`)
                        }
                      >
                        {/* Image with discount badge */}
                        <View style={styles.imageWrapper}>
                          <Image
                            source={{ uri: item.images?.[0] }}
                            style={styles.dealImage}
                            resizeMode="cover"
                          />
                          {item.discount && (
                            <View style={styles.discountBadge}>
                              <Text style={styles.discountText}>
                                Save {item.discount}%
                              </Text>
                            </View>
                          )}
                        </View>

                        {/* Title and price */}
                        <View style={styles.dealInfoContainer}>
                          <Text
                            style={styles.dealTitle}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item.title}
                          </Text>

                          <View style={styles.priceContainer}>
                            <Text style={styles.dealPrice}>₹{item.price}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )
            )}
          </ScrollView>
        )}
      </View>

      {/* Location Modal */}
      {showLocationModal && (
        <View style={styles.modalOverlay}>
          <LocationScreen onLocationSelected={handleLocationSelected} />
        </View>
      )}
    </View>
  );
};

export default Home;
