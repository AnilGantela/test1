import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Linking } from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "@/styles/product-style";

const screenWidth = Dimensions.get("window").width;
const ProductPage = () => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const parsedId = Array.isArray(productId) ? productId[0] : productId;

  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retailerProducts, setRetailerProducts] = useState([]);

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  // Fetch Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://pricepick-1032723282466.us-central1.run.app/user/product/${parsedId}`
        );
        const data = await response.json();

        if (!data || !data.product || !data.retailer) {
          throw new Error("Incomplete product data");
        }

        setCurrentProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (parsedId) {
      fetchProduct();
    }
  }, [parsedId]);

  // Fetch Related Retailer Products
  useEffect(() => {
    const fetchRetailerProducts = async () => {
      try {
        const retailerId = currentProduct?.retailer?._id;
        const mainProductId = currentProduct?.product?.id;

        if (retailerId) {
          const response = await fetch(
            `https://pricepick-1032723282466.us-central1.run.app/user/retailer/${retailerId}`
          );
          const data = await response.json();
          const filtered = data.products?.filter(
            (p) => p._id !== mainProductId
          );
          setRetailerProducts(filtered || []);
        }
      } catch (error) {
        console.error("Error fetching retailer products:", error);
      }
    };

    if (currentProduct) {
      fetchRetailerProducts();
    }
  }, [currentProduct]);

  // Handle Add to Cart
  // Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      const productData = currentProduct.product;
      const cartItem = {
        productId: productData.id,
        productName: productData.name,
        shopName: currentProduct.retailer.shopname,
        price: productData.price,
        discount: productData.discount,
        quantity: 1,
        image: productData.images?.[0], // Add the image URL (first image)
      };

      let cart = await AsyncStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : [];
      cart.push(cartItem);
      await AsyncStorage.setItem("cart", JSON.stringify(cart));

      Alert.alert("Success", "Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add product to cart.");
    }
  };

  const handleBuyNow = () => {
    Alert.alert("Proceeding to Checkout", "Redirecting to checkout...");
  };

  // Skeleton while loading
  if (loading) {
    return (
      <View style={styles.skeletonWrapper}>
        <SkeletonPlaceholder>
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonPrice} />
            <View style={styles.skeletonDescription} />
            <View style={styles.skeletonStock} />
            <View style={styles.skeletonRetailerSection} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  if (!currentProduct || !currentProduct.product) {
    return (
      <View style={styles.centered}>
        <Text>❌ Failed to load product.</Text>
      </View>
    );
  }

  const { product: productData, retailer } = currentProduct;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Carousel */}
      {productData.images?.length > 0 ? (
        <View style={[styles.imageCarouselContainer, { height: 300 }]}>
          <FlatList
            ref={flatListRef}
            data={productData.images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  width: screenWidth,
                  height: 300,
                  resizeMode: "contain",
                }}
              />
            )}
          />
          <View style={styles.thumbnailContainer}>
            {productData.images.map((img, index) => (
              <Pressable key={index} onPress={() => scrollToIndex(index)}>
                <Image
                  source={{ uri: img }}
                  style={[
                    styles.thumbnailImage,
                    currentIndex === index && styles.selectedThumbnail,
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.noImageContainer}>
          <Text>⚠️ No image available</Text>
        </View>
      )}

      {/* Title */}
      <Text style={styles.title}>{productData.name}</Text>

      {/* Price Row */}
      <View style={styles.priceContainer}>
        <Text style={styles.actualPrice}>
          ₹{productData.price.toLocaleString()}
        </Text>
        <Text style={styles.originalPrice}>
          ₹
          {Math.round(
            productData.price / (1 - productData.discount / 100)
          ).toLocaleString()}
        </Text>
        <Text style={styles.discount}>🔥 {productData.discount}% OFF</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <Pressable
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={productData.stock === 0}
        >
          <Text style={styles.addToCartText}>
            {productData.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.buyNowButton,
            productData.stock === 0 && styles.disabledButton,
          ]}
          onPress={handleBuyNow}
          disabled={productData.stock === 0}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </Pressable>
      </View>

      {/* Description */}
      <Text style={styles.sectionHeader}>📝 Description</Text>
      <Text style={styles.description}>
        {productData.description?.split(/\r?\n/).map((line, idx) => (
          <Text key={idx}>
            {line.trim()} {"\n"}
          </Text>
        ))}
      </Text>

      {/* Stock Info */}
      <Text style={styles.stock}>
        📦 Stock Left:{" "}
        {productData.stock > 0 ? productData.stock : "Out of stock"}
      </Text>

      <View style={styles.retailerSection}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {retailer.photo ? (
            <Image
              source={{ uri: retailer.photo }}
              style={[
                styles.retailerImage,
                { width: 80, height: 80, borderRadius: 10, marginRight: 12 },
              ]}
            />
          ) : (
            <View
              style={[
                styles.noImageContainer,
                { width: 80, height: 80, marginRight: 12 },
              ]}
            >
              <Text>No image</Text>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={styles.sectionHeader}>🏪 {retailer.shopname}</Text>

            <Text style={styles.retailerText}>📞 {retailer.phoneNumber}</Text>
            <Text style={styles.retailerText}>⏰ {retailer.shoptime}</Text>
            <Pressable
              onPress={() => {
                const address = retailer.address;
                const fullAddress = `${address?.street}, ${address?.city}, ${address?.state}, ${address?.pincode}`;
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  fullAddress
                )}`;
                Linking.openURL(mapUrl);
              }}
            >
              <Text style={styles.retailerText}>
                📍 {retailer.address?.city}, {retailer.address?.state}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Related Products */}
      {retailerProducts.length > 0 ? (
        <View style={styles.relatedProductsSection}>
          <Text style={styles.sectionHeader}>
            🛍️ More from {retailer.shopname}
          </Text>
          <FlatList
            data={retailerProducts}
            horizontal
            keyExtractor={(item) => item.id || item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/tabs/search/${item._id}`)}
              >
                <View style={styles.productCard}>
                  <Image
                    source={{ uri: item.image || item.images?.[0] }}
                    style={{ width: 120, height: 120, borderRadius: 10 }}
                  />
                  <Text style={styles.productTitle}>{item.name}</Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.noImageContainer}>
          <Text>📭 No related products</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductPage;
