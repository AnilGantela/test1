import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";

export default function OrdersScreen() {
  const handleTrackOrder = (orderId) => {
    // Replace with your own order tracking URL
    Linking.openURL(`https://your-order-tracking-url.com/order/${orderId}`);
  };

  // Sample orders data
  const orders = [
    {
      id: "ORD12345",
      status: "Shipped",
      date: "2025-04-01",
      total: "$50.00",
    },
    {
      id: "ORD12346",
      status: "Delivered",
      date: "2025-03-28",
      total: "$120.00",
    },
    {
      id: "ORD12347",
      status: "Processing",
      date: "2025-04-05",
      total: "$80.00",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <Text style={styles.description}>
        View your past orders and track their status.
      </Text>

      {orders.map((order) => (
        <View key={order.id} style={styles.orderItem}>
          <Text style={styles.orderId}>Order ID: {order.id}</Text>
          <Text style={styles.orderStatus}>Status: {order.status}</Text>
          <Text style={styles.orderDate}>Date: {order.date}</Text>
          <Text style={styles.orderTotal}>Total: {order.total}</Text>

          {/* Track Order Button */}
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => handleTrackOrder(order.id)}
          >
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.supportSectionTitle}>Need Help?</Text>
      <Text style={styles.supportDetails}>
        If you have any issues with your order, feel free to contact our support
        team.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderStatus: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 14,
    color: "#555",
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  trackButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  supportSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  supportDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
});
