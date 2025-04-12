import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme";

const { width } = Dimensions.get("window");
const isWeb = width > 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    color: "#5f5fd4",
    paddingTop: 20,
  },
  topContainer: {
    height: 120,
    paddingHorizontal: 16,
  },
  adContainer: {
    height: 250,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  locationIcon: {
    padding: 6,
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -25,
    marginLeft: isWeb ? 0 : 50,
  },
  productSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#5f5fd4",
  },
  dealCard: {
    width: 160,
    height: 240,
    marginRight: 12,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8, // Android shadow
  },

  dealImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  dealInfoContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "flex-end",
  },

  dealTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  dealPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 4,
  },

  dealDiscount: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 2,
    fontWeight: "600",
  },
});
