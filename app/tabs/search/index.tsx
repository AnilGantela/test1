import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { styles } from "@/styles/search-style";
import SearchElement from "@/components/SearchElement";
import RecentSearches from "@/components/RecentSearches";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";

// 📌 Add search query to user history
const addSearchQuery = async (query: string) => {
  try {
    if (!query.trim()) return;

    const cacheUser = await AsyncStorage.getItem("cachedUser");
    const parsedUser = JSON.parse(cacheUser || "{}");

    if (!parsedUser?.clerkId) return;

    const response = await fetch(
      `https://pricepick-1032723282466.us-central1.run.app/app/user/${parsedUser.clerkId}/addsearch`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: parsedUser.clerkId, query }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error adding search");
  } catch (error) {
    console.error("❌ Error adding search:", error);
  }
};

// 🌀 Loading UI
const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading results...</Text>
  </View>
);

// 🛒 No Results UI
const NoResults = ({ onRedirect }: { onRedirect: () => void }) => (
  <View style={styles.emptyCart}>
    <Image
      source={require("@/assets/images/empty-search.png")}
      style={styles.emptyImage}
      resizeMode="contain"
    />
    <Text style={styles.emptyText}>Whoops! Your search is not found.</Text>
    <Text style={styles.subText}>Let’s find something awesome to add!</Text>
    <TouchableOpacity style={styles.searchButton} onPress={onRedirect}>
      <Text style={styles.buttonText}>Browse Products</Text>
    </TouchableOpacity>
  </View>
);

// 🔽 Sort Picker
const SortPicker = ({
  sortOption,
  setSortOption,
}: {
  sortOption: string;
  setSortOption: (value: string) => void;
}) => (
  <View style={styles.pickerContainer}>
    <Text style={styles.filterText}>Sort By:</Text>
    <Picker
      selectedValue={sortOption}
      style={styles.picker}
      onValueChange={(itemValue) => setSortOption(itemValue)}
    >
      <Picker.Item label="Relevance" value="relevance" />
      <Picker.Item label="Price: Low to High" value="priceLowHigh" />
      <Picker.Item label="Price: High to Low" value="priceHighLow" />
    </Picker>
  </View>
);

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  const handleSearchRedirect = () => {
    router.push("/tabs/home");
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const loadRecentSearches = async () => {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches) setRecentSearches(JSON.parse(storedSearches));
    };
    loadRecentSearches();
  }, []);

  const saveRecentSearch = async (query: string) => {
    const lowerQuery = query.toLowerCase();
    const updatedSearches = [
      lowerQuery,
      ...recentSearches.filter((s) => s.toLowerCase() !== lowerQuery),
    ];
    const latestSearches = updatedSearches.slice(0, 5);
    setRecentSearches(latestSearches);
    await AsyncStorage.setItem(
      "recentSearches",
      JSON.stringify(latestSearches)
    );
  };

  const fetchSearchResults = async (query: string) => {
    try {
      const cachedAddress = await AsyncStorage.getItem("cacheAddress");
      const parsedAddress = cachedAddress ? JSON.parse(cachedAddress) : null;
      const city = parsedAddress?.city || "";

      const userUrl = `https://pricepick-1032723282466.us-central1.run.app/user/${encodeURIComponent(
        query
      )}`;
      const retailerUrl = `https://pricepick-1032723282466.us-central1.run.app/user/retailer/${encodeURIComponent(
        query
      )}`;

      const [userRes, retailerRes] = await Promise.all([
        fetch(userUrl),
        fetch(retailerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        }),
      ]);

      if (!userRes.ok && !retailerRes.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const userData = await userRes.json();
      const retailerData = await retailerRes.json();

      const userResults = userData.results || [];
      const retailerResults = retailerData.products || [];

      const combined = [...retailerResults, ...userResults];
      setSearchResults(combined);
    } catch (error) {
      console.error("❌ Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = async (query?: string) => {
    const searchValue = query || searchQuery;
    if (!searchValue.trim()) {
      Alert.alert("Enter something to search");
      return;
    }

    if (!query) await saveRecentSearch(searchValue);
    setLoading(true);
    await addSearchQuery(searchValue);
    await fetchSearchResults(searchValue);
  };

  const handleDeleteRecentSearch = async (query: string) => {
    const updatedSearches = recentSearches.filter((item) => item !== query);
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedSearches)
    );
  };

  const handleSelectSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const getSortedResults = () => {
    switch (sortOption) {
      case "priceLowHigh":
        return [...searchResults].sort((a, b) => a.price - b.price);
      case "priceHighLow":
        return [...searchResults].sort((a, b) => b.price - a.price);
      default:
        return searchResults;
    }
  };

  const sortedResults = getSortedResults();

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch()}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSearch()}>
          <Ionicons name="search" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color={COLORS.SECONDARY} />
          </TouchableOpacity>
        )}
      </View>

      {recentSearches.length > 0 &&
        !loading &&
        searchResults.length === 0 &&
        searchQuery.length === 0 && (
          <RecentSearches
            searches={recentSearches}
            onSelect={handleSelectSearch}
            onDelete={handleDeleteRecentSearch}
          />
        )}

      {searchResults.length > 0 && !loading && (
        <SortPicker sortOption={sortOption} setSortOption={setSortOption} />
      )}

      {loading && <LoadingIndicator />}

      {!loading && searchResults.length > 0 ? (
        <FlatList
          data={sortedResults}
          style={{ flex: 1, backgroundColor: COLORS.WHITE }}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => <SearchElement itemDetails={item} />}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
        searchQuery.length > 0 &&
        !loading && <NoResults onRedirect={handleSearchRedirect} />
      )}
    </>
  );
};

export default SearchBar;
