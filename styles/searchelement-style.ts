import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLORS } from "@/constants/theme"; // Import theme colors

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  elementContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: width - 50,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.BLACK,
  },
  retailerName: {
    fontSize: 14,
    color: COLORS.GREY,
  },
  titleContainer: {
    width: "70%",
  },
  priceText: {
    width: "30%",
    borderLeftWidth: 2,
    borderColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    height: "100%", //
  },
  priceValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
  },
});
