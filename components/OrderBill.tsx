import React from "react";
import { View, Text, Modal, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/styles/order-bill-style";

export default function OrderBill({
  visible,
  onClose,
  cartItems,
  totalPrice,
  totalDiscount,
}: {
  visible: boolean;
  onClose: () => void;
  cartItems: any[];
  totalPrice: number;
  totalDiscount: number;
}) {
  const router = useRouter();

  const handlePay = () => {
    onClose(); // close modal
    router.push({
      pathname: "/tabs/profile/OrderPayment",
      params: {
        total: totalPrice - totalDiscount,
        cart: JSON.stringify(cartItems),
      },
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>🧾 Order Summary</Text>

          <FlatList
            data={cartItems}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.productName}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
            )}
          />

          <View style={styles.summary}>
            <Text>Total: ₹{totalPrice.toLocaleString()}</Text>
            <Text>Discount: ₹{totalDiscount.toLocaleString()}</Text>
            <Text style={styles.grandTotal}>
              Payable: ₹{(totalPrice - totalDiscount).toLocaleString()}
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handlePay} style={styles.payButton}>
              <Text style={styles.payText}>Pay Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
