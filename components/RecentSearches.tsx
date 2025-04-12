import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (query: string) => void;
  onDelete: (query: string) => void;
}

/** 🔹 Recent Searches Component */
const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelect,
  onDelete,
}) => {
  return (
    <View style={styles.suggestionsContainer}>
      <FlatList
        data={searches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.suggestionItem}>
            {/* 🔹 Click to Search */}
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={styles.suggestionTextContainer}
            >
              <Ionicons name="time" size={18} color="#888" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>

            {/* 🔹 Cross Button to Delete Recent Search */}
            <TouchableOpacity
              onPress={() => onDelete(item)}
              style={styles.deleteButton}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default RecentSearches;

/** 🔹 Styles */
const styles = StyleSheet.create({
  suggestionsContainer: {
    marginTop: -7,
    paddingHorizontal: 15,
    height: 200,
    width: "100%",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 🔹 Space between text & delete button
    padding: 5,

    width: "auto",

    // 🔹 Shadow Effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Android shadow
    backgroundColor: "#fff", // Required for shadow to show on iOS
    // Optional: for softer edges
  },
  suggestionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // 🔹 Ensures text & icon stay aligned properly
  },
  suggestionText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    padding: 5,
  },
});
