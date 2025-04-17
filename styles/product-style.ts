import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  // Container and general styles
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  quantityContainer: {
    backgroundColor: COLORS.SECONDARY,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: COLORS.SECONDARY,
    padding: 8,
    borderRadius: 20,
    color: COLORS.WHITE,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color: "#fff",
  },
  addToCartButton: {
    backgroundColor: COLORS.SECONDARY,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },

  skeletonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonContainer: {
    width: "100%",
    height: 250,
  },
  skeletonImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  skeletonTitle: {
    marginTop: 12,
    width: "60%",
    height: 20,
    borderRadius: 4,
  },
  skeletonPrice: {
    marginTop: 8,
    width: "40%",
    height: 20,
    borderRadius: 4,
  },
  skeletonDescription: {
    marginTop: 8,
    width: "80%",
    height: 40,
    borderRadius: 4,
  },
  skeletonStock: {
    marginTop: 8,
    width: "50%",
    height: 20,
    borderRadius: 4,
  },
  skeletonRetailerSection: {
    marginTop: 20,
    width: "100%",
    height: 150,
    borderRadius: 10,
  },

  // Title, Description, and Price
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  actualPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
  },
  discount: {
    fontSize: 16,
    color: "#e74c3c",
    marginLeft: 10,
  },

  // Action buttons
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  buyNowButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },

  buyNowText: {
    fontSize: 16,
    color: "#fff",
  },

  // Stock Info
  stock: {
    fontSize: 16,
    marginVertical: 10,
  },

  // Retailer Section
  retailerSection: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  retailerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  retailerText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },

  // Related Products Section
  relatedProductsSection: {
    marginTop: 40,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productCard: {
    backgroundColor: "#f4f4f4",
    marginRight: 16,
    padding: 10,
    borderRadius: 8,
    width: 150,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#e74c3c",
  },

  // Thumbnail Container for Image Carousel
  thumbnailContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
    opacity: 0.7,
  },
  selectedThumbnail: {
    opacity: 1,
    borderColor: "#3498db",
    borderWidth: 2,
  },

  // Image Carousel Container (Main Product Image)
  imageCarouselContainer: {
    marginBottom: 20,
    flexDirection: "row",
  },
  noImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noImageText: {
    fontSize: 18,
    color: "#888",
  },

  // Main Product Image (carousel style)
  mainImageContainer: {
    width: "100%",
    height: 300, // Customize as needed
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  productMainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
});

export default styles;
