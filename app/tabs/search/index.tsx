import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/search-style";
import SearchElement from "@/components/SearchElement";
import RecentSearches from "@/components/RecentSearches";

const addSearchQuery = async (query: string) => {
  try {
    if (!query.trim()) {
      console.warn("⚠️ Empty query — skipping addSearch");
      return;
    }

    const cachedUser = await AsyncStorage.getItem("cachedUser");
    const parsedUser = JSON.parse(cachedUser);

    if (!parsedUser?.id) {
      console.error("⚠️ User not logged in or missing ID");
      return;
    }

    const response = await fetch(
      `https://pricepick-1032723282466.us-central1.run.app/app/user/${parsedUser.id}/addsearch`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: parsedUser.id,
          query,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error adding search");
    }
  } catch (error) {
    console.error("❌ Error adding search:", error);
  }
};

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading results...</Text>
  </View>
);

/** 🔹 No Results Component */
const NoResults = () => (
  <View style={styles.noResultsContainer}>
    <Text style={styles.noResultsText}>No results found.</Text>
  </View>
);

/** 🔹 Filter Buttons Component */
const FilterButtons = ({
  filterType,
  setFilterType,
}: {
  filterType: "name" | "price";
  setFilterType: (type: "name" | "price") => void;
}) => (
  <View style={styles.filterContainer}>
    <Text style={styles.filterText}>Filter By</Text>
    <View style={styles.filterButtonContainer}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterType("name")}
      >
        <Text style={styles.filterButtonText}>
          Name {filterType === "name" ? "✓" : ""}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterType("price")}
      >
        <Text style={styles.filterButtonText}>
          Price {filterType === "price" ? "✓" : ""}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

/** 🔹 Main SearchBar Component */
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterType, setFilterType] = useState<"name" | "price">("name");
  const [loading, setLoading] = useState(false);

  // 🔹 Load recent searches
  useEffect(() => {
    const loadRecentSearches = async () => {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches) setRecentSearches(JSON.parse(storedSearches));
    };
    loadRecentSearches();
  }, []);

  /** 🔹 Save search query to recent */
  const saveRecentSearch = async (query: string) => {
    const updatedSearches = [
      query,
      ...recentSearches.filter((s) => s !== query),
    ];
    const latestSearches = updatedSearches.slice(0, 5);
    setRecentSearches(latestSearches);
    await AsyncStorage.setItem(
      "recentSearches",
      JSON.stringify(latestSearches)
    );
  };

  /** 🔹 Fetch from both endpoints with city param */
  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);

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

      const userData = await userRes.json();
      const retailerData = await retailerRes.json();

      const userResults = userData.results || [];
      const retailerResults = retailerData.products || [];

      const combinedResults = [...userResults, ...retailerResults];
      setSearchResults(combinedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
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
    if (!searchValue.trim()) return;

    if (!query) await saveRecentSearch(searchValue);
    await addSearchQuery(searchQuery);
    fetchSearchResults(searchValue);
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

  /** 🔹 Sorting results */
  const sortedResults = [...searchResults].sort((a, b) =>
    filterType === "name" ? a.title.localeCompare(b.title) : a.price - b.price
  );

  return (
    <>
      {/* 🔹 Search Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch()}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSearch()}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* 🔹 Recent Searches */}
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

      {/* 🔹 Filter Toggle */}
      {searchResults.length > 0 && !loading && (
        <FilterButtons filterType={filterType} setFilterType={setFilterType} />
      )}

      {/* 🔹 Loader */}
      {loading && <LoadingIndicator />}

      {/* 🔹 Search Results */}
      {!loading && searchResults.length > 0 ? (
        <FlatList
          data={sortedResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <SearchElement itemDetails={item} />}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
        searchQuery.length > 0 && !loading && <NoResults />
      )}
    </>
  );
};

export default SearchBar;
