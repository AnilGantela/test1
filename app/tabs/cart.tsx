import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "@/styles/cart-style";
import Icon from "react-native-vector-icons/Feather";
import OrderBill from "@/components/OrderBill";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showOrderBill, setShowOrderBill] = useState(false);
  const router = useRouter();

  const handleSearchRedirect = () => {
    router.push("/tabs/search");
  };

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

    if (newQuantity < 1) return;

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
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Error", "Failed to remove item from cart.");
    }
  };

  const handleCheckout = () => {
    setShowOrderBill(true);
  };

  const handlePay = async () => {
    setShowOrderBill(false);
    Alert.alert("Success", "Payment successful!");
    await AsyncStorage.removeItem("cart");
    setCartItems([]);
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const renderItem = ({ item, index }: any) => (
    <View style={styles.cartItem}>
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

        <View style={styles.rowContainer}>
          <Text style={styles.shopName}>{item.shopName}</Text>
          <Text style={styles.productPrice}>
            ₹{item.price.toLocaleString()}
          </Text>
        </View>

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
          <Image
            source={require("@/assets/images/empty-cart.png")}
            style={styles.emptyImage}
            resizeMode="contain" // Makes sure the image fits within the container without distortion
          />
          <Text style={styles.emptyText}>
            🛒 Whoops! Your cart’s still empty.
          </Text>
          <Text style={styles.subText}>
            Let’s find something awesome to add!
          </Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchRedirect}
          >
            <Text style={styles.buttonText}>Browse Products</Text>
          </TouchableOpacity>
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
          <Pressable onPress={handleCheckout} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Checkout</Text>
          </Pressable>
        </View>
      )}

      <OrderBill
        visible={showOrderBill}
        onClose={() => setShowOrderBill(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        totalDiscount={totalDiscount}
        onPay={handlePay}
      />
    </View>
  );
}
