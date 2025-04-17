import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme"; // adjust this import if needed

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
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
  cartList: {
    paddingBottom: 10,
  },
  quantityAndRemoveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    padding: 4,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginHorizontal: 4,
  },
  qtyButtonText: {
    fontSize: 14,
    color: "#333",
  },
  productQuantity: {
    fontSize: 10,
    color: "#5f5fd4",
    marginHorizontal: 6,
  },
  removeButton: {
    marginLeft: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  noImageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5f5fd4",
    lineHeight: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    flexWrap: "wrap",
  },
  shopName: {
    fontSize: 12,
    color: "#5f5fd4",
    marginVertical: 2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5f5fd4",
    flex: 1,
    textAlign: "center",
  },
  productDiscount: {
    fontSize: 12,
    color: "#5f5fd4",
    flex: 1,
    textAlign: "right",
  },
  cartSummary: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalDiscount: {
    fontSize: 16,
    color: "#FF6347",
    marginVertical: 5,
  },
  buyButton: {
    marginTop: 15,
    backgroundColor: "#5f5fd4",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
