import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyImage: {
    width: "100%", // Make the image take the full width
    height: 250, // Set a fixed height, adjust as needed
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: COLORS.SECONDARY, // You can customize the button color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 10,
    backgroundColor: COLORS.LIGHT_BG,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  suggestionsContainer: {
    marginHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    elevation: 2,
  },
  filterWrapper: {
    marginHorizontal: 12,
    marginVertical: 10,
    backgroundColor: COLORS.SECONDARY,
  },
  pickerContainer: { backgroundColor: COLORS.SECONDARY },
  filterLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: COLORS.WHITE,
    fontWeight: "600",
  },
  picker: {
    height: 48,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 8,
    justifyContent: "center",
    color: COLORS.WHITE,
  },
  clearButton: {
    position: "absolute",
    right: 45, // Adjust to fit inside input field
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  suggestionItem: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.NEUTRAL,
  },
  suggestionText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.BLACK,
  },

  // 🔹 Filter Section
  filterContainer: {
    flexDirection: "column",
    height: 90,
    paddingTop: 10,
    backgroundColor: "#007AFF",
    marginTop: -5,
  },
  filterButtonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  filterText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  filterButton: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  filterButtonText: {
    color: "#007AFF",
    fontSize: 20,
  },
  resultsContainer: {
    padding: 20, // Adds spacing at the bottom
  },
  // 🔹 Loading & No Results Styling
  loadingContainer: {
    marginTop: 20,
    height: height - 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  noResultsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.GREY,
  },

  // 🔹 Price Summary
  priceSummaryContainer: {
    padding: 12,
    backgroundColor: COLORS.LIGHT_BG,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  priceSummaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.BLACK,
  },
});
