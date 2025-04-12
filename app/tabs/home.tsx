import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/home-style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationScreen from "@/components/LocationScreen";
import AdScreen from "@/components/AdScreen";

const Home = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityAndProducts = async () => {
      try {
        let finalCity = "Mangalagiri";
        const cachedAddressString = await AsyncStorage.getItem("cacheAddress");
        if (cachedAddressString) {
          const cachedAddress = JSON.parse(cachedAddressString);
          if (cachedAddress?.city) {
            finalCity = cachedAddress.city;
          }
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
    };

    fetchCityAndProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <LocationScreen />
        <Image
          source={require("@/assets/images/web-logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Product section fills remaining height */}
      <View style={styles.productSection}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.adContainer}>
              <AdScreen />
            </View>
            {Object.entries(productsByCategory).map(
              ([categoryName, products]) => (
                <View key={categoryName} style={{ marginBottom: 20 }}>
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
                        onPress={() => router.push(`/tabs/search/${item._id}`)}
                      >
                        <Image
                          source={{ uri: item.images?.[0] }}
                          style={styles.dealImage}
                          resizeMode="cover"
                        />
                        <View style={styles.dealInfoContainer}>
                          <Text
                            style={styles.dealTitle}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item.title}
                          </Text>
                          <Text style={styles.dealPrice}>₹{item.price}</Text>
                          {item.discount && (
                            <Text style={styles.dealDiscount}>
                              Save {item.discount}%
                            </Text>
                          )}
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
    </View>
  );
};

export default Home;
