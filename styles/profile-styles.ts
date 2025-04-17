import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    color: COLORS.SECONDARY,
    justifyContent: "center",
  },
  profileRow: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: "column", // 👈 Stack vertically
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2, // 👈 Perfect circle
    backgroundColor: "#eee",
    marginBottom: 12,
    color: COLORS.SECONDARY, // 👈 Space between image and name
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  email: {
    marginTop: 4,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.SECONDARY,
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 10,
    height: height * 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },

  emptyText: {
    color: "#888",
    fontStyle: "italic",
  },
  searchItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchQuery: {
    fontSize: 16,
    fontWeight: "600",
  },
  searchCount: {
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#5f5fd4",
    padding: 14,
    borderRadius: 12,
    width: "80%",
    marginBottom: 5,
    marginHorizontal: 30,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomSection: {},

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    minWidth: (width - 80) / 3,
  },

  actionButtonLabel: {
    marginTop: 6,
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  // Your existing styles

  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  backButtonLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: "#000",
  },
});
