import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme"; // Ensure your theme colors are correct

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: COLORS.WHITE,
  },
  brandSection: {
    height: 300,
    marginTop: -100, // Center content horizontally
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  logo: {
    width: width * 0.9,
    height: 300,
    resizeMode: "cover",
    marginLeft: -20,
  },
  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60, // Center content horizontally
  },
  googleButton: {
    width: width - 50,
    flexDirection: "row",
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.WHITE,
    textAlign: "center", // Center text
  },
  logText: {
    fontSize: 10,
    color: COLORS.GREY,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "900",
  },
});
