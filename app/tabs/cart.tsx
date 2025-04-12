import { View, Text, FlatList, Pressable, Alert, Image } from "react-native";
import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "@/styles/cart-style";
import Icon from "react-native-vector-icons/Feather"; // Add this import at the top

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const calculateTotal = () => {
    let totalPrice = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      const qty = item.quantity ?? 1;
      totalPrice += item.price * qty;
      totalDiscount += (item.price * item.discount * qty) / 100;
    });

    return { totalPrice, totalDiscount };
  };

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        setCartItems(JSON.parse(cartData));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const updateQuantity = async (index: number, change: number) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return; // Don't allow quantity < 1

    updatedCart[index] = {
      ...item,
      quantity: newQuantity,
    };

    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = async (index: number) => {
    try {
      const updatedCart = cartItems.filter((_, idx) => idx !== index);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      Alert.alert("Success", "Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Error", "Failed to remove item from cart.");
    }
  };

  const handleBuyNow = () => {
    // You can customize this to navigate to a checkout page
    Alert.alert("Proceeding to Checkout", "Redirecting to checkout...");
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const renderItem = ({ item, index }: any) => (
    <View style={styles.cartItem}>
      {/* Product Image */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      ) : (
        <View style={styles.noImageContainer}>
          <Text>No Image</Text>
        </View>
      )}

      <View style={styles.itemDetails}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.productName}
        </Text>

        {/* Shop Name, Price, and Discount in the same line */}
        <View style={styles.rowContainer}>
          <Text style={styles.shopName}>{item.shopName}</Text>
          <Text style={styles.productPrice}>
            ₹{item.price.toLocaleString()}
          </Text>
        </View>

        {/* Quantity controls and Remove button in the same line */}
        <View style={styles.quantityAndRemoveContainer}>
          <View style={styles.quantityControls}>
            <Pressable
              onPress={() => updateQuantity(index, -1)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtyButtonText}>−</Text>
            </Pressable>

            <Text style={styles.productQuantity}>{item.quantity}</Text>

            <Pressable
              onPress={() => updateQuantity(index, 1)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>
          </View>

          {/* Remove button */}
          <Pressable
            onPress={() => handleRemoveItem(index)}
            style={styles.removeButton}
          >
            <Icon name="trash-2" size={20} color="#ff4d4d" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const { totalPrice, totalDiscount } = calculateTotal();

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>🛒 Your Cart is Empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.cartList}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.cartSummary}>
          <Text style={styles.totalPrice}>
            Total Price: ₹{totalPrice.toLocaleString()}
          </Text>
          <Text style={styles.totalDiscount}>
            Total Saved: ₹{totalDiscount.toLocaleString()}
          </Text>
          <Pressable onPress={handleBuyNow} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
