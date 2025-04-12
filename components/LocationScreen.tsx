import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

interface Address {
  name?: string;
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
}

const LocationScreen: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCachedAddress = async () => {
      try {
        const cached = await AsyncStorage.getItem("cacheAddress");
        if (cached) setAddress(JSON.parse(cached));
      } catch (error) {
        console.error("🚨 Error loading cached address:", error);
      }
    };

    loadCachedAddress();
  }, []);

  const getUserAddress = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("❌ Location permission denied");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const addressData = await Location.reverseGeocodeAsync(location.coords);

      if (addressData.length > 0) {
        const fetched = addressData[0];

        const simplified = {
          city: fetched.city,
          pincode: fetched.postalCode,
          street: fetched.street,
          region: fetched.region,
          country: fetched.country,
        };

        setAddress(simplified);
        await AsyncStorage.setItem("cacheAddress", JSON.stringify(simplified));
      }
    } catch (err) {
      console.error("🚨 Error fetching address:", err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {!address && !loading && (
        <TouchableOpacity style={styles.button} onPress={getUserAddress}>
          <Ionicons name="location-sharp" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {address && (
        <Text style={styles.addressText}>
          {address.pincode}
          {"\n"}
          {address.city}
        </Text>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    justifyContent: "center",
    height: 50,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    width: 50,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
